import io
import os
import logging
from typing import Tuple, Dict, Any
import numpy as np
from PIL import Image

from app.config import settings

logger = logging.getLogger(__name__)

# Standard class mapping for rice leaf disease detection models
CLASS_NAMES = [
    "bacterial_leaf_blight",
    "brown_spot",
    "healthy",
    "leaf_blast",
    "sheath_blight",
    "tungro"
]

class MLService:
    def __init__(self):
        self.model = None
        self.model_loaded = False
        self._try_load_model()

    def _try_load_model(self):
        model_path = settings.MODEL_PATH
        if os.path.exists(model_path):
            try:
                import tensorflow as tf
                logger.info("Loading TensorFlow model from %s...", model_path)
                self.model = tf.keras.models.load_model(model_path)
                self.model_loaded = True
                logger.info("TensorFlow model loaded successfully.")
            except Exception as e:
                logger.warning("Failed to load TensorFlow model: %s. Using heuristic fallback.", str(e))
                self.model = None
                self.model_loaded = False
        else:
            logger.info("Model file not found at '%s'. Using heuristic/mock prediction service.", model_path)
            self.model = None
            self.model_loaded = False

    def preprocess_image(self, image_bytes: bytes, target_size: Tuple[int, int] = (224, 224)) -> Tuple[np.ndarray, Image.Image]:
        """
        Loads image from raw bytes with Pillow, converts to RGB, and resizes.
        """
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        resized_img = image.resize(target_size)
        img_array = np.array(resized_img, dtype=np.float32) / 255.0
        # Expand dimension for batch: (1, 224, 224, 3)
        img_batch = np.expand_dims(img_array, axis=0)
        return img_batch, image

    def predict(self, image_bytes: bytes) -> Dict[str, Any]:
        """
        Executes inference on image. Uses TensorFlow model if loaded;
        otherwise runs an image feature-based heuristic analyzer.
        """
        img_batch, pil_img = self.preprocess_image(image_bytes)

        if self.model_loaded and self.model is not None:
            try:
                raw_predictions = self.model.predict(img_batch)[0]
                pred_index = int(np.argmax(raw_predictions))
                confidence = float(raw_predictions[pred_index]) * 100
                disease_key = CLASS_NAMES[pred_index] if pred_index < len(CLASS_NAMES) else "healthy"
                
                all_probs = {
                    name: round(float(prob) * 100, 2)
                    for name, prob in zip(CLASS_NAMES, raw_predictions)
                }

                return {
                    "disease_key": disease_key,
                    "confidence": round(confidence, 2),
                    "all_probabilities": all_probs,
                    "is_mock": False
                }
            except Exception as e:
                logger.error("Error during TensorFlow inference: %s. Falling back to heuristic.", str(e))

        # Heuristic analysis based on visual characteristics of leaf image
        return self._heuristic_prediction(pil_img)

    def _heuristic_prediction(self, pil_img: Image.Image) -> Dict[str, Any]:
        """
        Analyzes image color characteristics (green ratio, yellow/brown necrotic patches)
        to provide deterministic, realistic classifications and probability distributions.
        """
        small_img = pil_img.resize((64, 64))
        arr = np.array(small_img, dtype=np.float32)

        r = arr[:, :, 0]
        g = arr[:, :, 1]
        b = arr[:, :, 2]

        total_pixels = 64 * 64
        # Dominant green indicates healthy tissue
        green_ratio = np.sum((g > r * 1.08) & (g > b * 1.08)) / total_pixels
        # Yellowish / brownish necrotic discoloration
        yellow_brown_ratio = np.sum((r > 130) & (g > 110) & (b < 100)) / total_pixels
        # Dark brownish spots
        dark_spot_ratio = np.sum((r > 60) & (r < 130) & (g < 90) & (b < 70)) / total_pixels

        if green_ratio > 0.65 and yellow_brown_ratio < 0.08:
            disease_key = "healthy"
            confidence = 94.5 + float(green_ratio * 4.0)
        elif dark_spot_ratio > 0.15:
            disease_key = "brown_spot"
            confidence = 88.0 + float(dark_spot_ratio * 20.0)
        elif yellow_brown_ratio > 0.25:
            disease_key = "bacterial_leaf_blight"
            confidence = 91.0 + float(yellow_brown_ratio * 15.0)
        elif yellow_brown_ratio > 0.12 and green_ratio < 0.40:
            disease_key = "tungro"
            confidence = 86.5 + float(yellow_brown_ratio * 12.0)
        else:
            disease_key = "leaf_blast"
            confidence = 89.2 + float(dark_spot_ratio * 15.0)

        # Clamp confidence between 78% and 98%
        confidence = round(min(max(confidence, 78.5), 98.4), 1)

        # Distribute remaining probability realistically among other classes
        remaining = round(100.0 - confidence, 1)
        other_classes = [c for c in CLASS_NAMES if c != disease_key]
        split_prob = round(remaining / len(other_classes), 1)
        
        all_probabilities = {disease_key: confidence}
        for cls in other_classes:
            all_probabilities[cls] = split_prob

        return {
            "disease_key": disease_key,
            "confidence": confidence,
            "all_probabilities": all_probabilities,
            "is_mock": True
        }

ml_service = MLService()
