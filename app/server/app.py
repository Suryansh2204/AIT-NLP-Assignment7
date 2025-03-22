from flask import Flask,request,jsonify
from flask_cors import CORS
import torch
import pickle
app=Flask(__name__)

# Enable CORS
CORS(app,resources={r"/*": {"origins": "http://localhost:3000"}})

# device cuda or cpu
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# Load the model and tokenizer
with open("../../model/student_model_odd.pkl", "rb") as f:
    model = pickle.load(f)
with open("../../model/student_tokenizer_odd.pkl", "rb") as f:
    tokenizer = pickle.load(f)

def predict_toxicity(text, model, tokenizer, device):
    model.eval()
    # Tokenize the input
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
    
    # Run the model
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probs = torch.softmax(logits, dim=-1)
        predicted_class = torch.argmax(probs, dim=-1).item()
    
    # Map back to label
    id2label = {0: "non-toxic", 1: "toxic"}
    return {
        "text": text,
        "predicted_class": predicted_class,
        "label": id2label[predicted_class],
        "confidence": probs[0][predicted_class].item()
    }
    
@app.route('/is-toxic', methods=['GET'])
def isToxic():
    try:
        text =  request.args.get('text')
        response= predict_toxicity(text, model, tokenizer, device)
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/', methods=['GET'])
def call():
    return jsonify({'Name':"Suryansh Srivastava", 'ID':124997,'proglib':'NLP Assignment 7'})
if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)