# 🌾 RiceGuard — AI-Based Rice Leaf Disease Detection & Treatment Recommendation System

An end-to-end full-stack agronomic platform combining Deep Convolutional Vision, localized micro-climate weather analysis, and rule-based Integrated Pest Management (IPM) recommendation engines to detect foliar rice leaf pathogens and safeguard crop yield.

---

## 📑 Table of Contents
- [Architecture Overview](#-architecture-overview)
- [Tech Stack](#-tech-stack)
- [End-to-End Pipeline](#-end-to-end-pipeline)
- [Quick Start Guide](#-quick-start-guide)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
  - [3. Database Setup](#3-database-setup)
- [CNN Model & Mock Mode](#-cnn-model--mock-mode)
  - [Automated Mock Mode Demo](#automated-mock-mode-demo)
  - [Swapping Mock Mode for a Real .h5 Model](#swapping-mock-mode-for-a-real-h5-model)
- [Target Pathogen Spectrum](#-target-pathogen-spectrum)
- [API Endpoints](#-api-endpoints)

---

## 🏛 Architecture Overview

```
rice-guard/
├── backend/
│   ├── app/
│   │   ├── main.py                  # FastAPI app + CORS + lifespan hooks
│   │   ├── config.py                # Pydantic BaseSettings loading .env
│   │   ├── database.py              # Motor AsyncIOMotorClient (predictions & users)
│   │   ├── models/                  # Document schemas
│   │   ├── schemas/
│   │   │   └── prediction_schema.py # Pydantic request/response models
│   │   ├── routes/
│   │   │   ├── predict.py           # POST /api/predict (CNN + Weather + IPM)
│   │   │   ├── weather.py           # GET /api/weather (Micro-climate)
│   │   │   └── history.py           # GET /api/history (MongoDB audit logs)
│   │   ├── services/
│   │   │   ├── cnn_service.py       # Keras .h5 model loader & PIL preprocessing
│   │   │   ├── weather_service.py   # HTTPX OpenWeatherMap integration
│   │   │   └── recommendation_service.py # Agronomic IPM rule engine
│   │   └── ml_models/
│   │       ├── README.md            # Model specs & placement instructions
│   │       └── rice_leaf_model.h5   # (Place trained weights here)
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Emerald green sticky navigation + mobile drawer
    │   │   ├── ImageUpload.jsx      # Drag-and-drop file uploader with preview
    │   │   ├── WeatherWidget.jsx    # Micro-climate telemetry display
    │   │   ├── ResultCard.jsx       # Diagnosis card, risk badge & Recharts probabilities
    │   │   └── HistoryTable.jsx     # Sortable table with pagination
    │   ├── pages/
    │   │   ├── Home.jsx             # Hero landing page & feature highlights
    │   │   ├── Detect.jsx           # Two-column diagnostic scanner workspace
    │   │   └── History.jsx          # Audit log table with deletion option
    │   ├── services/
    │   │   └── api.js               # Axios client instance
    │   ├── App.jsx                  # Main routing structure
    │   ├── main.jsx                 # React DOM mount with BrowserRouter
    │   └── index.css                # Tailwind base directives & Inter typography
    ├── index.html
    ├── vite.config.js               # Vite dev server + /api proxy
    ├── tailwind.config.js           # Emerald & agricultural theme palette
    └── package.json
```

---

## ⚡ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TailwindCSS, React Router v6, Axios, Recharts, Lucide Icons, Canvas Confetti |
| **Backend** | FastAPI, Uvicorn, Motor (Async MongoDB), TensorFlow / Keras, Pillow (PIL), HTTPX, Pydantic v2 |
| **Database** | MongoDB (async via Motor AsyncIOMotorClient on port 27017) |
| **External Services** | OpenWeatherMap API (with resilient fallback telemetry) |

---

## 🔄 End-to-End Pipeline

```
[1. User Uploads Leaf Image + GPS Coordinates]
                    │
                    ▼
[2. Frontend sends multipart/form-data to POST /api/predict]
                    │
                    ▼
[3. FastAPI Backend receives image & runs Vision Pipeline]
   ├── PIL normalizes & resizes image to (224, 224, 3)
   └── CNNService executes Keras inference or Mock mode
                    │
                    ▼
[4. Micro-Climate Telemetry Collection]
   └── WeatherService queries OpenWeatherMap (temperature, humidity, rainfall, wind)
                    │
                    ▼
[5. Agronomic Rule Engine Assessment]
   └── RecommendationService calculates environmental disease pressure
       (Favourable humidity, temperature band, rainfall > 5mm, confidence escalation)
                    │
                    ▼
[6. Asynchronous MongoDB Persistence]
   └── Motor writes full diagnosis document to `predictions` collection
                    │
                    ▼
[7. Dynamic UI Visualization]
   └── Frontend renders ResultCard: disease name, confidence, risk badge,
       weather card, 4-step treatment steps, and Recharts probability bar chart.
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python:** 3.10+
- **Node.js:** 18+ (Node 20+ recommended)
- **MongoDB:** Installed and running locally on port `27017`

---

### 1. Backend Setup

```bash
# Navigate to backend directory
cd rice-guard/backend

# Create and activate virtual environment
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> **Verification:** You will see the startup banner:
> ```
> 🚀 RiceGuard API started
> ```
> - Interactive OpenAPI Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
> - Health Check: [http://localhost:8000/health](http://localhost:8000/health)

---

### 2. Frontend Setup

In a new terminal:
```bash
# Navigate to frontend directory
cd rice-guard/frontend

# Install dependencies
npm install

# Launch Vite development server
npm run dev
```

- Open your browser at: **[http://localhost:5173](http://localhost:5173)**

The Vite configuration proxies all `/api` requests to `http://localhost:8000`:
```javascript
// vite.config.js
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
    },
  },
}
```

---

### 3. Database Setup

Ensure MongoDB is active on the default port:
```bash
# Verify MongoDB connection (URI: mongodb://localhost:27017)
mongosh mongodb://localhost:27017
```
Database name: `rice_guard_db`  
Collections automatically created upon first prediction:
- `predictions`: Diagnosis history and treatment records
- `users`: User and field management records

*(Note: If MongoDB is offline, the backend automatically uses an in-memory cache so you can test features without interruptions!)*

---

## 🤖 CNN Model & Mock Mode

### Automated Mock Mode Demo
You do **not** need a trained `.h5` model to demo and test RiceGuard!

- If `app/ml_models/rice_leaf_model.h5` is **not present**, `CNNService` automatically detects this on startup and enters **MOCK mode**.
- In mock mode, the service generates realistic probability distributions across the 6 target classes and calculates corresponding confidence scores.
- The entire pipeline (image upload $\to$ CNN $\to$ weather $\to$ rule engine $\to$ MongoDB $\to$ UI display) functions out of the box.

### Swapping Mock Mode for a Real .h5 Model

To deploy your trained convolutional neural network:

1. Train a model with the following specification:
   - **Input Shape:** `(224, 224, 3)`
   - **Normalization:** Scaled to `[0.0, 1.0]` (pixels divided by 255.0)
   - **Output:** Softmax dense layer with 6 output units corresponding to:
     ```python
     CLASSES = [
         "Bacterial Leaf Blight",
         "Brown Spot",
         "Leaf Smut",
         "Rice Blast",
         "Tungro",
         "Healthy"
     ]
     ```
2. Save your trained Keras model as `rice_leaf_model.h5`.
3. Place the file inside:
   ```
   rice-guard/backend/app/ml_models/rice_leaf_model.h5
   ```
4. Restart the FastAPI server. On boot, `CNNService` will detect `rice_leaf_model.h5`, load the Keras weights, and automatically switch from mock mode to live neural network inference.

---

## 🌿 Target Pathogen Spectrum

| Disease | Pathogen | Favourable Climate | Key Treatment Protocol |
| :--- | :--- | :--- | :--- |
| **Rice Blast** | *Magnaporthe oryzae* | Humidity $\ge 90\%$, Temp $19-24^\circ\text{C}$ | Tricyclazole 75% WP @ 0.6g/L, avoid excess nitrogen, maintain shallow flood water |
| **Bacterial Leaf Blight** | *Xanthomonas oryzae* | Humidity $\ge 85\%$, Temp $25-34^\circ\text{C}$ | Streptocycline (1g) + Copper Oxychloride (25g) per 10L water, drain standing water |
| **Brown Spot** | *Bipolaris oryzae* | Humidity $\ge 80\%$, Temp $20-30^\circ\text{C}$ | Mancozeb 75% WP @ 2.5g/L or Propiconazole, correct soil potassium (K) / silicon (Si) |
| **Leaf Smut** | *Entyloma oryzae* | Humidity $\ge 80\%$, Temp $25-32^\circ\text{C}$ | Carbendazim 50% WP @ 1g/L, certified seeds, deep ploughing of crop residues |
| **Tungro Virus** | Vector-borne (RTBV / RTSV) | Humidity $\ge 75\%$, Temp $24-30^\circ\text{C}$ | Imidacloprid 17.8% SL vector control, rogue out infected plants, resistant cultivars |
| **Healthy Foliage** | None | Normal Agronomic Range | Routine weekly scouting, balanced NPK with potash at panicle initiation |

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Returns `{"status": "RiceGuard API running"}` |
| `GET` | `/health` | Healthcheck returning database connectivity status |
| `POST` | `/api/predict` | Multipart form-data: `file`, `latitude`, `longitude`. Runs CNN, fetches weather, assesses risk, stores doc, returns diagnosis |
| `GET` | `/api/weather` | Query params: `lat`, `lon`. Returns temperature, humidity, rainfall, and wind speed |
| `GET` | `/api/history` | Query params: `limit` (default: 20). Returns past predictions sorted chronologically |
| `DELETE` | `/api/history/{id}` | Deletes a diagnosis record by ID |

---

## 📜 License & Credits
Developed for educational research, sustainable agronomic technology, and early rice crop protection.
Distributed under the MIT License.
