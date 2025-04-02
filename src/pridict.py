import sys
import json
import pickle
from sklearn.preprocessing import LabelEncoder

def main():
    # Get arguments
    outlook = sys.argv[1]
    temp = sys.argv[2]
    humidity = sys.argv[3]
    windy = sys.argv[4]
    
    # Load model and encoders
    try:
        with open('model.pkl', 'rb') as f:
            model_data = pickle.load(f)
            model = model_data['model']
            encoders = model_data['encoders']
            y_encoder = model_data['y_encoder']
    except Exception as e:
        return json.dumps({'error': str(e)})
    
    # Prepare input data
    input_data = {
        'Outlook': outlook,
        'Temp': temp,
        'Humidity': humidity,
        'Windy': windy
    }
    
    # Encode input data
    encoded_data = []
    for feature, value in input_data.items():
        encoded_data.append(encoders[feature].transform([value])[0])
    
    # Make prediction
    prediction = model.predict([encoded_data])
    result = y_encoder.inverse_transform(prediction)[0]
    
    return json.dumps({'prediction': result})

if __name__ == '__main__':
    try:
        result = main()
        print(result)
    except Exception as e:
        print(json.dumps({'error': str(e)}))