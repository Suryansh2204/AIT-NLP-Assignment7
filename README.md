# ☢️ ToxiMeter - Because words can be radioactive

ToxiMeter is a web application that detects toxic content in user-submitted text using fine-tuned BERT-based models. The project explores multiple training strategies—odd-layer and even-layer distillation from a 12-layer BERT teacher model, and LoRA-based fine-tuning. The application allows users to input a sentence and receive a prediction on whether it is toxic, along with the model’s confidence level.

<hr>

## 🚀 **Features**

- 🖥️ **Multiple Student Models:**

  - Odd-layer distilled model (6 layers from teacher’s odd layers)
  - Even-layer distilled model (6 layers from teacher’s even layers)
  - Full 12-layer LoRA fine-tuned student model

- ⚛️ **Web App:**

  - Frontend in React (TypeScript)
  - Backend in Flask with endpoints for model inference

- 🧪 **Toxicity Detection API:**
  - Predicts whether a sentence is toxic or non-toxic
  - Returns confidence, predicted_class, label, and original input
  - LoRA-based model provides the best performance

<hr>

## 🎥 App Demo

> 🔗 _[Demo Link – To be uploaded]_

The application flow:

- A user types a sentence into the frontend interface.
- The text is sent to the Flask backend via the `/is-toxic` API.
- The backend runs inference using a trained model.
- The result i.e. predicted_class, label, confidence, and original input is sent back and shown in the UI.

<hr>

## 📊 Model Overview

The system is built upon the `bert-base-uncased` 12-layer transformer. Three variations of student models were trained and evaluated:

- **Odd-Layer Student:**  
  Constructed using layers 1, 3, 5, 7, 9, and 11 from the teacher model.
- **Even-Layer Student:**  
  Built using layers 2, 4, 6, 8, 10 and 12.

- **LoRA Fine-Tuned Student (12 layers):**  
  A parameter-efficient model where only low-rank adapters were fine-tuned, enabling the full BERT model's capacity with fewer trainable parameters.

Each model was trained on the `civil_comments` dataset, with toxicity labels computed using a weighted average of fields such as `toxicity`, `severe_toxicity`, `insult`, `threat`, `identity_attack`, `sexual_explicit` and `obscene`. Evaluation included classification loss, KL divergence, cosine similarity, and accuracy.

<hr>

The structure is organized as follows:

```
AIT-NLP-Assignment7/
│── app/
│   ├── client/   # React TS frontend
│   │   ├── public/
│   │   ├── src/
│   │   └── ...
│   ├── server/   # Flask backend
│   │   ├── app.py
│   │   └── requirements.txt
│
│── notebooks/
│   ├── distilBERT_6_layer_student_model.ipynb      # Odd and even, 6 Layer student model
│   └── Task3-LORA.ipynb                            # LoRA, 12 layer student model
│
│── model/
│   ├── student_model_even.pkl
│   ├── student_model_LoRA.pkl
│   ├── student_model_odd.pkl
│   ├── student_tokenizer_even.pkl
│   ├── student_tokenizer_LoRA.pkl
│   └── student_tokenizer_odd.pkl
│
│── README.md
└── A7_DISTIL_VS_LORA.pdf
```

<hr>

## 🛠️ How It Works

- User inputs a sentence.
- A GET request is sent to `http://localhost:5000/is-toxic?text=your_input_here`.
- The model processes the text and returns:
  - `text`: Original input
  - `predicted_class`: 0 (non-toxic) or 1 (toxic)
  - `label`: "Toxic" or "Non-Toxic"
  - `confidence`: Probability of the predicted class

<hr>

### Application Endpoints

- **Frontend (React app):** Runs on http://localhost:3000
- **Backend (Flask API):** Runs on http://localhost:5000

### API Endpoints

#### **`GET /`**- Returns author information.

#### **`GET /is-toxic`** - Returns toxicity prediction for the given input text.

- Description: Accepts a sentence and generates an answer based on the model's inference of whether the sentence is Toxic or not.
- Parameters:
  - text (string) → The input sentence to classify
- Response: JSON with `text`, `predicted_class`, `label`, and `confidence`
- Example Request:

  ```
  curl "http://localhost:5000/is-toxic?text=You are stupid as hell"
  ```

- Response Format:
  ```
  {
    "text": "You are stupid as hell.",
    "predicted_class": 1,
    "label": "Toxic",
    "confidence": "0.8765445456"
  }
  ```

## Installation and Setup

### Clone the Repository (Using Git LFS)

Since the repository contains large model files, you need to install Git LFS before cloning:

1. Install Git LFS (if not installed):

```

git lfs install

```

2. Clone the repository:

```

git clone https://github.com/Suryansh2204/AIT-NLP-Assignment7.git
cd AIT-NLP-Assignment7

```

## Setup and Running the Application

### Install Backend Dependencies

```

cd server
pip install -r requirements.txt

```

### Install Frontend Dependencies

```

cd client
yarn install

```

### Run the Flask Backend

```

cd server
python app.py

```

### Run the React Frontend

```

cd client
yarn start

```

- Open http://localhost:3000/ in your browser.
