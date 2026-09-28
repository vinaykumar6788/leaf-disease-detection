# Machine Learning Models Directory

Place your trained Keras/TensorFlow model file here:
`rice_leaf_model.h5`

### Model Specifications:
- **Input shape:** `(None, 224, 224, 3)`
- **Pixel normalization:** Scaled to `[0.0, 1.0]` (divided by 255.0)
- **Output classes (alphabetical):**
  1. `bacterial_leaf_blight`
  2. `brown_spot`
  3. `healthy`
  4. `leaf_blast`
  5. `sheath_blight`
  6. `tungro`

When `rice_leaf_model.h5` is present in this directory, the FastAPI backend will automatically detect and load it on startup. If absent, the backend runs an intelligent visual heuristic analyzer to allow full end-to-end development and testing.
