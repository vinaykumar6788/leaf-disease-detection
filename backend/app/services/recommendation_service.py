import logging
from typing import Dict, Any, List, Union

logger = logging.getLogger(__name__)

class RecommendationService:
    DISEASE_RULES: Dict[str, Dict[str, Any]] = {
        "Rice Blast": {
            "favourable": {
                "humidity": 90,
                "temp_min": 19,
                "temp_max": 24
            },
            "treatment": [
                "Targeted Curative Spray: Apply Tricyclazole 75% WP @ 0.6 g/L of clean water (120 g in 200 L water per acre) with a fine cone nozzle at early spindle lesion appearance.",
                "Canopy Moisture Regulation: Maintain continuous shallow standing water (2–4 cm) to suppress airborne blast conidia spore germination.",
                "Nutrient Balancing: Immediately halt nitrogen top-dressing and apply Muriate of Potash @ 15 kg/ha to strengthen foliar cuticular thickness."
            ]
        },
        "Bacterial Leaf Blight": {
            "favourable": {
                "humidity": 85,
                "temp_min": 25,
                "temp_max": 34
            },
            "treatment": [
                "Targeted Bactericide Spray: Spray Streptocycline (1 g) mixed with Copper Oxychloride 50% WP (25 g) in 10 L water per 500 sq.m at 10-day intervals.",
                "Paddy Water Drainage: Immediately drain excess standing flood water from infected paddy plots to a shallow 2 cm to prevent bacterial ooze dispersal.",
                "Nutrient Balancing: Suspend all nitrogenous top-dressing (Urea) and apply supplemental Potassium (MOP @ 20 kg/ha) to harden leaf vascular walls."
            ]
        },
        "Brown Spot": {
            "favourable": {
                "humidity": 80,
                "temp_min": 20,
                "temp_max": 30
            },
            "treatment": [
                "Targeted Fungicide Spray: Apply foliar spray of Propiconazole 25% EC (Tilt) @ 1.0 ml/L of clean water (200 ml in 200 L water per acre) across affected foliage.",
                "Soil Moisture Maintenance: Prevent field soil drying by maintaining constant saturation (1–2 cm standing water) to relieve plant water stress.",
                "Soil Nutrient Correction: Top-dress with Muriate of Potash @ 20 kg/ha and Zinc Sulfate @ 10 kg/ha to eliminate physiological nutrient deficiencies."
            ]
        },
        "Leaf Smut": {
            "favourable": {
                "humidity": 80,
                "temp_min": 25,
                "temp_max": 32
            },
            "treatment": [
                "Targeted Fungicide Spray: Apply Carbendazim 50% WP @ 1.0 g/L of clean water (200 g in 200 L water per acre) targeting lower and mid-canopy foliage.",
                "Canopy Aeration & Weeding: Clean field bunds and prune dense vegetation to allow sunlight penetration and reduce micro-humidity in the leaf canopy.",
                "Nutrient Management: Maintain balanced N-P-K fertilization (100:50:50 kg/ha) and avoid excessive dense vegetative growth."
            ]
        },
        "Tungro": {
            "favourable": {
                "humidity": 75,
                "temp_min": 24,
                "temp_max": 30
            },
            "treatment": [
                "Targeted Vector Control: Spray Imidacloprid 17.8% SL @ 0.3 ml/L of clean water (60 ml in 200 L water per acre) to eliminate Green Leafhopper vectors.",
                "Sanitation & Roguing: Uproot severely stunted, orange-yellow infected hills, place in a sack, and bury outside field perimeter to destroy viral reservoirs.",
                "Vector Monitoring: Install 15 yellow sticky traps per hectare across the paddy canopy to continuously monitor and suppress remaining leafhopper populations."
            ]
        },
        "Healthy": {
            "favourable": {
                "humidity": 70,
                "temp_min": 20,
                "temp_max": 35
            },
            "treatment": [
                "No Chemical Intervention: Foliage shows healthy vegetative vigor; no fungicide, bactericide, or pesticide sprays are required.",
                "Routine Canopy Scouting: Continue regular weekly field scouting, inspecting lower leaf sheaths and blade margins under morning light.",
                "Balanced Crop Nutrition: Maintain scheduled balanced N-P-K nutrient application with split potash application at panicle initiation."
            ]
        }
    }

    def _normalize_disease_name(self, disease: str) -> str:
        """Finds the corresponding canonical key in DISEASE_RULES."""
        d_lower = (disease or "").strip().lower().replace("_", " ").replace("-", " ")
        for rule_key in self.DISEASE_RULES.keys():
            if rule_key.lower() == d_lower or d_lower in rule_key.lower() or rule_key.lower() in d_lower:
                return rule_key
        return "Healthy"

    def assess(self, disease: str, weather: Union[Dict[str, Any], Any], cnn_confidence: float) -> Dict[str, Any]:
        """
        Assesses disease risk level and provides actionable treatment steps.

        - If Healthy -> returns {"risk_level": "NONE", "treatment": [...]}
        - Compute risk_score:
            +1 if humidity >= threshold
            +1 if temp in range [temp_min, temp_max]
            +1 if rainfall > 5
        - risk_score >= 3 -> "HIGH", == 2 -> "MODERATE", else "LOW"
        - Escalate MODERATE to HIGH if cnn_confidence > 0.9
        - Returns {"risk_level": str, "treatment": list}
        """
        matched_key = self._normalize_disease_name(disease)
        rule = self.DISEASE_RULES.get(matched_key, self.DISEASE_RULES["Healthy"])
        treatment = rule["treatment"]

        # If Healthy -> return NONE risk level
        if matched_key == "Healthy":
            return {
                "risk_level": "NONE",
                "treatment": treatment
            }

        # Extract weather parameters
        humidity = 0.0
        temp = 0.0
        rainfall = 0.0

        if weather is not None:
            if isinstance(weather, dict):
                humidity = float(weather.get("humidity", 0.0) or 0.0)
                temp = float(weather.get("temperature", 0.0) or 0.0)
                rainfall = float(weather.get("rainfall", 0.0) or 0.0)
            else:
                humidity = float(getattr(weather, "humidity", 0.0) or 0.0)
                temp = float(getattr(weather, "temperature", 0.0) or 0.0)
                rainfall = float(getattr(weather, "rainfall", 0.0) or 0.0)

        favourable = rule["favourable"]
        risk_score = 0

        # +1 if humidity >= threshold
        if humidity >= favourable["humidity"]:
            risk_score += 1

        # +1 if temp in range [temp_min, temp_max]
        if favourable["temp_min"] <= temp <= favourable["temp_max"]:
            risk_score += 1

        # +1 if rainfall > 5
        if rainfall > 5:
            risk_score += 1

        # Compute base risk level
        if risk_score >= 3:
            risk_level = "HIGH"
        elif risk_score == 2:
            risk_level = "MODERATE"
        else:
            risk_level = "LOW"

        # Escalate MODERATE to HIGH if cnn_confidence > 0.9 (or > 90.0 if percentage passed)
        conf_norm = float(cnn_confidence) if cnn_confidence is not None else 0.0
        if conf_norm > 1.0:
            conf_norm = conf_norm / 100.0

        if risk_level == "MODERATE" and conf_norm > 0.9:
            risk_level = "HIGH"

        return {
            "risk_level": risk_level,
            "treatment": treatment
        }

# Expose singleton instance
recommendation_service = RecommendationService()
