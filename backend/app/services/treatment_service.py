from typing import Dict, Any, List

DISEASE_DATABASE: Dict[str, Dict[str, Any]] = {
    "bacterial_leaf_blight": {
        "id": "bacterial_leaf_blight",
        "name": "Bacterial Leaf Blight",
        "scientific_name": "Xanthomonas oryzae pv. oryzae",
        "pathogen_type": "Bacterial",
        "severity": "High",
        "description": "Bacterial leaf blight causes water-soaked to yellowish lesions along leaf margins that rapidly enlarge, turn whitish-gray, and cause wilting ('kresek') in seedlings.",
        "symptoms": [
            "Water-soaked stripes on leaf blades or margins",
            "Yellowish to grayish-white undulating lesions",
            "Milky bacterial ooze drops visible in morning humidity",
            "Complete drying and wilting of affected leaves"
        ],
        "favorable_conditions": "High temperatures (25-34°C), relative humidity above 85%, heavy rainstorms, and excess nitrogen fertilizer.",
        "treatments": {
            "organic": [
                "Foliar spray of Pseudomonas fluorescens @ 5g/liter of water",
                "Apply fresh cow dung extract (20%) or neem seed kernel extract (NSKE 5%)",
                "Apply Trichoderma viride enriched farmyard manure"
            ],
            "chemical": [
                "Spray Streptomycin sulphate + Tetracycline hydrochloride (Plantomycin/Paushamycin) @ 1g/10 liters + Copper Oxychloride @ 25g/10 liters",
                "Apply Copper Hydroxide (Kocide 2000) @ 2.5g/liter during early infection",
                "Bismerthiazol (Thiodiazole copper) @ 2g/liter of water"
            ],
            "cultural": [
                "Avoid excess application of chemical nitrogen; balance with potash (K2O)",
                "Ensure proper field drainage; avoid stagnant deep water",
                "Maintain wider plant spacing to allow sun penetration and air circulation",
                "Eradicate weed hosts and volunteer rice plants"
            ],
            "prevention": [
                "Treat seeds with Streptocycline (1.5g in 10L water for 25kg seed) for 8-10 hours",
                "Use resistant varieties like IR64, Improved Samba Mahsuri, or PR 126",
                "Crop rotation with leguminous green manure crops"
            ]
        }
    },
    "brown_spot": {
        "id": "brown_spot",
        "name": "Brown Spot",
        "scientific_name": "Bipolaris oryzae (Cochliobolus miyabeanus)",
        "pathogen_type": "Fungal",
        "severity": "Moderate",
        "description": "Brown spot produces small, oval or circular brown lesions with yellow halos across leaf surfaces and glumes, often associated with nutrient-deficient or water-stressed soils.",
        "symptoms": [
            "Small, oval to cylindrical brown spots with gray or whitish centers",
            "Distinct yellow halo surrounding dark brown margins",
            "Dark brown or black discoloration on grains (glume blight)",
            "Premature drying and death of leaves in severe cases"
        ],
        "favorable_conditions": "Moderate temperature (20-30°C), relative humidity > 80%, poorly drained, nutrient-poor (low potassium/silicon) sandy soils.",
        "treatments": {
            "organic": [
                "Spray bio-control agent Trichoderma harzianum @ 10g/L or Pseudomonas fluorescens @ 10g/L",
                "Foliar application of fermented butter milk + asafoetida (hing) extract",
                "Apply silicon-rich bio-fertilizers or rice husk ash to strengthen leaf cuticles"
            ],
            "chemical": [
                "Spray Mancozeb 75% WP @ 2.5g/liter or Zineb 75% WP @ 2g/liter",
                "Apply Propiconazole 25% EC (Tilt) @ 1ml/liter or Hexaconazole 5% SC @ 2ml/liter",
                "Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 2g/liter of water"
            ],
            "cultural": [
                "Apply balanced fertilizers based on soil test (ensure adequate Potash and Zinc)",
                "Avoid moisture stress during tillering and flowering stages",
                "Incorporate compost and green manure to improve soil fertility and water retention"
            ],
            "prevention": [
                "Seed treatment with Thiram 75% WP or Carbendazim 50% WP @ 2g/kg of seeds",
                "Hot water seed treatment at 52-54°C for 10-15 minutes",
                "Cultivate tolerant cultivars such as CR Dhan 310 or Swarna"
            ]
        }
    },
    "leaf_blast": {
        "id": "leaf_blast",
        "name": "Leaf Blast",
        "scientific_name": "Magnaporthe oryzae (Pyricularia oryzae)",
        "pathogen_type": "Fungal",
        "severity": "High",
        "description": "Blast is one of the most destructive rice diseases worldwide. It manifests as diamond/spindle-shaped lesions on leaves and can infect collars, necks, and panicles.",
        "symptoms": [
            "Spindle-shaped (elliptical) lesions with gray or ash-white centers and brownish margins",
            "Lesions coalesce causing entire leaf blades to wither and scorch ('blast')",
            "Brownish discoloration at leaf collars (collar blast)",
            "Rotting of panicle base causing empty or poorly filled panicles (neck blast)"
        ],
        "favorable_conditions": "Cool nighttime temperatures (19-24°C), high relative humidity (>90%), prolonged leaf wetness (dew), and high nitrogen doses.",
        "treatments": {
            "organic": [
                "Foliar spray of Pseudomonas fluorescens @ 10g/liter every 15 days",
                "Spray raw neem oil (3%) mixed with mild liquid soap emulsifier",
                "Foliar application of Vermiwash (10%) to induce systemic acquired resistance"
            ],
            "chemical": [
                "Spray Tricyclazole 75% WP (Beam) @ 0.6g/liter at first onset of spindle lesions",
                "Apply Isoprothiolane 40% EC (Fuji-one) @ 1.5ml/liter or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/liter",
                "Kasugamycin 3% SL @ 2.5ml/liter of water"
            ],
            "cultural": [
                "Split nitrogen applications into 3-4 doses rather than a single heavy application",
                "Maintain continuous shallow flooding (2-5 cm) to suppress blast spore infection",
                "Destroy infected crop residues and maintain weed-free bunds"
            ],
            "prevention": [
                "Seed dressing with Tricyclazole 75% WP @ 2g/kg seed",
                "Plant blast-resistant certified cultivars such as Tetep, Rasi, or Jaya",
                "Avoid late planting which coincides with peak sporulation weather"
            ]
        }
    },
    "tungro": {
        "id": "tungro",
        "name": "Tungro Disease",
        "scientific_name": "Rice tungro bacilliform virus (RTBV) & Rice tungro spherical virus (RTSV)",
        "pathogen_type": "Viral (Vector-borne)",
        "severity": "High",
        "description": "Tungro is a devastating viral disease transmitted by the green leafhopper (Nephotettix virescens). Plants show stunted growth and yellow-orange discoloration.",
        "symptoms": [
            "Stunted plant growth and reduced tillering",
            "Leaves turn yellow to bright orange starting from leaf tips and margins",
            "Mottled appearance with young leaves showing interveinal chlorosis",
            "Delayed flowering and poorly exerted, sterile panicles"
        ],
        "favorable_conditions": "Abundant vector population (Green Leafhopper), continuous cropping without fallow period, temperatures between 24-30°C.",
        "treatments": {
            "organic": [
                "Spray 5% Neem Seed Kernel Extract (NSKE) or Neem Oil @ 3ml/L to deter green leafhoppers",
                "Set up yellow sticky traps (15-20 traps/hectare) to monitor and trap adult leafhoppers",
                "Install light traps in the field to attract and destroy night-flying hoppers"
            ],
            "chemical": [
                "Vector management: Spray Imidacloprid 17.8% SL @ 0.3ml/liter or Thiamethoxam 25% WG @ 0.2g/liter",
                "Apply Dinotefuran 20% SG @ 0.4g/liter for rapid hopper knockdown",
                "Buprofezin 25% SC @ 1.5ml/liter to control hopper nymph populations"
            ],
            "cultural": [
                "Rogue out and bury infected virus-carrying plants immediately",
                "Observe a synchronous planting schedule and a 1-month fallow period between crops",
                "Plow down stubbles immediately after harvest to destroy vector habitats"
            ],
            "prevention": [
                "Grow green leafhopper resistant varieties such as IR36, IR64, or Vikramarya",
                "Nursery seed treatment with Imidacloprid 70% WS @ 5g/kg seed"
            ]
        }
    },
    "sheath_blight": {
        "id": "sheath_blight",
        "name": "Sheath Blight",
        "scientific_name": "Rhizoctonia solani",
        "pathogen_type": "Fungal",
        "severity": "Moderate to High",
        "description": "Sheath blight causes oval or greenish-gray lesions on leaf sheaths near the water level, which expand upward to leaves creating a snake-skin appearance.",
        "symptoms": [
            "Water-soaked, oval, grayish-green lesions on sheaths near water line",
            "Lesions enlarge and merge with irregular dark brownish margins ('snake skin' look)",
            "Formation of white mustard-like sclerotial bodies on diseased parts",
            "Lodging of crop and premature canopy senescence"
        ],
        "favorable_conditions": "High relative humidity (85-100%), temperature around 28-32°C, high planting density, and excessive nitrogen.",
        "treatments": {
            "organic": [
                "Soil and foliar application of Trichoderma viride @ 2.5kg/ha mixed with FYM",
                "Spray Pseudomonas fluorescens @ 10g/liter of water",
                "Apply Panchagavya (3%) foliar spray to boost natural plant immunity"
            ],
            "chemical": [
                "Spray Validamycin 3% L @ 2ml/liter of water at first symptom",
                "Apply Hexaconazole 5% EC @ 2ml/liter or Thifluzamide 24% SC @ 0.75ml/liter",
                "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/liter"
            ],
            "cultural": [
                "Maintain optimal plant spacing (20x15 cm) to avoid dense overcrowded canopy",
                "Drain the field intermittently during tillering stage to dry sheaths",
                "Avoid over-fertilization with nitrogenous fertilizers"
            ],
            "prevention": [
                "Deep summer ploughing to bury overwintering sclerotia",
                "Clean field bunds and eliminate alternate grass hosts",
                "Use certified clean seeds"
            ]
        }
    },
    "healthy": {
        "id": "healthy",
        "name": "Healthy Rice Leaf",
        "scientific_name": "Oryza sativa (Normal)",
        "pathogen_type": "None",
        "severity": "Healthy",
        "description": "The leaf shows vigorous green coloration, intact venation, and absence of pathogenic lesions or pest discoloration.",
        "symptoms": [
            "Vibrant, uniform green leaf blade",
            "No necrotic lesions, halos, or chlorosis",
            "Turgid and upright foliage with healthy leaf tip"
        ],
        "favorable_conditions": "Optimal agronomic care, balanced NPK nutrition, regulated water regime, and favorable ambient climate.",
        "treatments": {
            "organic": [
                "Maintain regular application of well-decomposed vermicompost or FYM",
                "Prophylactic foliar spray of Pseudomonas fluorescens (2g/L) monthly"
            ],
            "chemical": [
                "No chemical pesticides required; maintain protective crop monitoring"
            ],
            "cultural": [
                "Continue balanced irrigation (alternate wetting and moderate drying)",
                "Monitor for early insect pest threshold (leaf folders, stem borers, hoppers)",
                "Apply potash at panicle initiation to strengthen plant stems and grain filling"
            ],
            "prevention": [
                "Regular scout inspections every 5-7 days during peak vegetative growth",
                "Keep field bunds trimmed to prevent harboring weed-borne pathogens"
            ]
        }
    },
    "leaf_smut": {
        "id": "leaf_smut",
        "name": "Leaf Smut",
        "scientific_name": "Entyloma oryzae",
        "pathogen_type": "Fungal",
        "severity": "Moderate",
        "description": "Leaf smut produces small, slightly raised, angular, lead-black spots on both sides of the leaf blades, which rupture during humid weather to release teliospores.",
        "symptoms": [
            "Small, slightly raised, angular black spots on leaf blades",
            "Lesions bordered by leaf veins giving an angular appearance",
            "Coalescing spots causing premature leaf yellowing and tip drying",
            "Black powdery soot-like dust released when spots burst"
        ],
        "favorable_conditions": "High humidity, shaded crop canopy, and late maturity stages of the crop.",
        "treatments": {
            "organic": [
                "Spray bio-control agent Trichoderma viride @ 5g/L",
                "Apply raw neem oil formulation (3%) with liquid soap emulsifier",
                "Foliar spray of wood ash extract to enhance silica deposition"
            ],
            "chemical": [
                "Foliar spray of Mancozeb 75% WP @ 2g/liter or Propiconazole 25% EC @ 1ml/liter",
                "Copper oxychloride 50% WP @ 2.5g/liter at first sign of angular black spots"
            ],
            "cultural": [
                "Avoid late planting and excessive plant density",
                "Burn or bury severely infected crop residues after harvest",
                "Maintain balanced nitrogen fertilization"
            ],
            "prevention": [
                "Certified disease-free seed selection",
                "Hot water seed treatment at 52°C for 10 minutes",
                "Crop rotation with non-host crops"
            ]
        }
    },
    "rice_blast": {
        "id": "rice_blast",
        "name": "Rice Blast",
        "scientific_name": "Magnaporthe oryzae (Pyricularia oryzae)",
        "pathogen_type": "Fungal",
        "severity": "High",
        "description": "Blast is one of the most destructive rice diseases worldwide. It manifests as spindle-shaped lesions with gray centers on leaves, collars, and panicles.",
        "symptoms": [
            "Spindle-shaped elliptical lesions with gray-white centers and brown borders",
            "Rapid lesion coalescence leading to severe leaf blast scorched appearance",
            "Neck rot and collar blast causing partially filled or sterile panicles"
        ],
        "favorable_conditions": "Cool nights (19-24°C), relative humidity exceeding 90%, and excessive nitrogen fertilizer.",
        "treatments": {
            "organic": [
                "Foliar spray of Pseudomonas fluorescens @ 10g/liter every 15 days",
                "Spray raw neem oil (3%) mixed with mild liquid soap emulsifier"
            ],
            "chemical": [
                "Spray Tricyclazole 75% WP (Beam) @ 0.6g/liter at first symptom",
                "Apply Isoprothiolane 40% EC @ 1.5ml/liter or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/liter"
            ],
            "cultural": [
                "Split nitrogen applications into 3-4 doses",
                "Maintain continuous shallow flooding (2-5 cm) to suppress blast spores"
            ],
            "prevention": [
                "Seed dressing with Tricyclazole 75% WP @ 2g/kg seed",
                "Plant blast-resistant certified cultivars"
            ]
        }
    }
}

class TreatmentService:
    @staticmethod
    def get_disease_details(disease_key: str) -> Dict[str, Any]:
        normalized_key = disease_key.strip().lower().replace(" ", "_").replace("-", "_")
        if normalized_key in DISEASE_DATABASE:
            return DISEASE_DATABASE[normalized_key]
        # Match partial
        for key, data in DISEASE_DATABASE.items():
            if normalized_key in key or key in normalized_key:
                return data
        return DISEASE_DATABASE["healthy"]

    @staticmethod
    def list_all_diseases() -> List[Dict[str, Any]]:
        return list(DISEASE_DATABASE.values())

treatment_service = TreatmentService()
