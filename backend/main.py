from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import numpy as np
from PIL import Image
import io
import tensorflow as tf
import os
import json
from datetime import datetime
from fpdf import FPDF
import absl.logging
import os

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)

# Suppress TensorFlow warnings
absl.logging.set_verbosity(absl.logging.ERROR)

app = FastAPI()
sio_app = app  # Optional alias for compatibility

# CORS - adjust origins in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to your frontend URL for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure directories exist
os.makedirs("saved_images", exist_ok=True)
os.makedirs("reports", exist_ok=True)

# Serve static files for images and PDF reports
app.mount("/images", StaticFiles(directory="saved_images"), name="images")
app.mount("/reports", StaticFiles(directory="reports"), name="reports")

# Load the Keras model saved in native format (.keras)
model = tf.keras.models.load_model("plant_disease_classifier_final.keras")

# Class labels corresponding to the model output
class_names = ['Apple Scab', 'Apple Black Rot', 'Cedar Apple Rust', 'Healthy']

def generate_pdf(prediction, confidence, info, save_path):
    """Generate PDF report for the prediction."""
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=14)
    pdf.cell(200, 10, txt="Plant Disease Diagnosis Report", ln=True, align='C')
    pdf.ln(10)
    pdf.cell(200, 10, txt=f"Prediction: {prediction}", ln=True)
    pdf.cell(200, 10, txt=f"Confidence: {confidence:.2f}", ln=True)
    pdf.cell(200, 10, txt=f"Severity: {info['severity']}", ln=True)
    pdf.ln(5)
    pdf.multi_cell(200, 10, txt=f"Treatment: {info['treatment']}")
    pdf.ln(2)
    pdf.multi_cell(200, 10, txt=f"Prevention: {info['prevention']}")
    pdf.output(save_path)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """Accept an uploaded image file, predict plant disease, save image and PDF report, and return info."""
    try:
        image = Image.open(io.BytesIO(await file.read())).convert("RGB")
        image = image.resize((224, 224))
        img_array = np.array(image) / 255.0
        img_batch = np.expand_dims(img_array, axis=0)

        predictions = model.predict(img_batch)
        confidence = float(np.max(predictions))
        predicted_class = class_names[np.argmax(predictions)]

        disease_info = {
            "Apple Scab": {
                "treatment": "Apply fungicides and prune infected leaves.",
                "prevention": "Improve air circulation and avoid overhead watering.",
                "severity": "Moderate"
            },
            "Apple Black Rot": {
                "treatment": "Remove infected branches and use fungicide.",
                "prevention": "Harvest ripe fruit and disinfect tools.",
                "severity": "High"
            },
            "Cedar Apple Rust": {
                "treatment": "Use rust-resistant plant varieties.",
                "prevention": "Remove nearby cedar trees if possible.",
                "severity": "Moderate"
            },
            "Healthy": {
                "treatment": "No treatment needed.",
                "prevention": "Maintain regular inspection and care.",
                "severity": "N/A"
            }
        }

        info = disease_info.get(predicted_class, {
            "treatment": "No treatment info available.",
            "prevention": "No prevention info available.",
            "severity": "Unknown"
        })

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        image_filename = f"{timestamp}.png"
        pdf_filename = f"{timestamp}.pdf"
        image_path = os.path.join("saved_images", image_filename)
        pdf_path = os.path.join("reports", pdf_filename)

        image.save(image_path)
        generate_pdf(predicted_class, confidence, info, pdf_path)

        # Append prediction to history JSON file
        history_entry = {
            "timestamp": timestamp,
            "prediction": predicted_class,
            "confidence": confidence,
            "severity": info["severity"],
            "status": "treated" if predicted_class != "Healthy" else "healthy",
            "image_url": f"/images/{image_filename}",
            "report_url": f"/reports/{pdf_filename}",
            "reportFilename": pdf_filename
        }

        history_file = "prediction_history.json"
        if os.path.exists(history_file):
            with open(history_file, "r") as f:
                history_data = json.load(f)
        else:
            history_data = []

        history_data.append(history_entry)
        with open(history_file, "w") as f:
            json.dump(history_data, f, indent=2)

        return JSONResponse({
            "prediction": predicted_class,
            "confidence": confidence,
            "treatment": info["treatment"],
            "prevention": info["prevention"],
            "severity": info["severity"],
            "image_url": f"/images/{image_filename}",
            "report_url": f"/reports/{pdf_filename}"
        })

    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/history")
async def get_history():
    """Return prediction history as JSON."""
    try:
        file_path = os.path.join(os.path.dirname(__file__), "prediction_history.json")
        with open(file_path, "r") as f:
            history = json.load(f)
        return JSONResponse(history)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/download/pdf/{filename}")
async def download_pdf(filename: str):
    """Serve saved PDF reports for download."""
    file_path = os.path.join("reports", filename)
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename=filename, media_type="application/pdf")
    return JSONResponse(status_code=404, content={"error": "PDF not found"})
