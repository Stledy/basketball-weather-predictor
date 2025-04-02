import pandas as pd
from sklearn.naive_bayes import CategoricalNB
from sklearn.preprocessing import LabelEncoder
import pickle

def train_model():
    # Load dataset
    data = pd.read_csv('../data/temperature.csv')
    
    # Prepare features and target
    X = data[['Outlook', 'Temp', 'Humidity', 'Windy']]
    y = data['Play Basketball']
    
    # Encode categorical variables
    encoders = {}
    for column in X.columns:
        encoders[column] = LabelEncoder()
        X[column] = encoders[column].fit_transform(X[column])
    
    # Encode target variable
    y_encoder = LabelEncoder()
    y = y_encoder.fit_transform(y)
    
    # Train model
    model = CategoricalNB()
    model.fit(X, y)
    
    # Save model and encoders
    with open('model.pkl', 'wb') as f:
        pickle.dump({
            'model': model,
            'encoders': encoders,
            'y_encoder': y_encoder
        }, f)
    
    print("Model trained and saved successfully!")

if __name__ == '__main__':
    train_model()