import pandas as pd
import json
import os
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from datetime import timedelta

# Load the dataset
data = pd.read_csv('beaches/data-configuration/FINAL_data_merged.csv')

# Specify the exact format of the timestamps if known
# Assuming 'Measurement Timestamp' is in the format 'YYYY-MM-DD HH:MM:SS'
data['Measurement Timestamp'] = pd.to_datetime(data['Measurement Timestamp'], format='%Y-%m-%d %H:%M:%S', errors='coerce')
# Assuming 'Date' is in the format 'YYYY-MM-DD'
data['Date'] = pd.to_datetime(data['Date'], format='%Y-%m-%d', errors='coerce')

# Extract date features
data['Year'] = data['Date'].dt.year
data['Month'] = data['Date'].dt.month
data['DayOfWeek'] = data['Date'].dt.dayofweek

# One-hot encode categorical variables
data_encoded = pd.get_dummies(data, columns=['Beach Name', 'Location_ecoli', 'Nearest Weather Station'])

# Define the features and target variables, ensure no non-numeric columns remain
X = data_encoded.drop(columns=['Ecoli Predicted Level', 'DNA Reading Mean', 'Date', 'Measurement Timestamp'])
y = data_encoded[['Ecoli Predicted Level', 'DNA Reading Mean']]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train initial Random Forest model to get feature importances
initial_rf = RandomForestRegressor(n_estimators=100, random_state=42)
initial_rf.fit(X_train, y_train)

# Predict and evaluate the initial model
y_pred_initial = initial_rf.predict(X_test)
rmse_initial = np.sqrt(mean_squared_error(y_test, y_pred_initial))
mae_initial = mean_absolute_error(y_test, y_pred_initial)
r2_initial = r2_score(y_test, y_pred_initial)

print("Initial Root Mean Squared Error:", rmse_initial)
print("Initial Mean Absolute Error:", mae_initial)
print("Initial R-squared:", r2_initial)

# Get feature importances and sort them
feature_importances = initial_rf.feature_importances_
features_sorted = np.argsort(feature_importances)

# Remove the least important features (e.g., remove features with importance less than a threshold)
threshold = 0.02
important_features = [X.columns[i] for i in features_sorted if feature_importances[i] >= threshold]

# Redefine X with important features only
X_important = X[important_features]

# Split the data again with the important features only
X_train_important, X_test_important, y_train, y_test = train_test_split(X_important, y, test_size=0.2, random_state=42)

# Expanded hyperparameter tuning with Random Forest
param_grid = {
    'n_estimators': [76, 77, 78],
    'max_depth': [6, 7, 8, 9],
    'min_samples_split': [2, 3],  # Note: min_samples_split cannot be 1
    'min_samples_leaf': [19, 20, 21],
    'max_features': ['sqrt']
}

grid_search = GridSearchCV(RandomForestRegressor(random_state=42), param_grid, cv=3, scoring='neg_mean_squared_error', verbose=2, n_jobs=-1)
grid_search.fit(X_train_important, y_train)

# Best model
best_rf = grid_search.best_estimator_

# Predict and evaluate with the important features only
y_pred_important = best_rf.predict(X_test_important)
rmse_important = np.sqrt(mean_squared_error(y_test, y_pred_important))
mae_important = mean_absolute_error(y_test, y_pred_important)
r2_important = r2_score(y_test, y_pred_important)

print("Optimized Root Mean Squared Error with Important Features:", rmse_important)
print("Optimized Mean Absolute Error with Important Features:", mae_important)
print("Optimized R-squared with Important Features:", r2_important)
print("Best Parameters with Important Features:", grid_search.best_params_)
print("Feature Importances with Important Features:", best_rf.feature_importances_)

# Cross-validation score with important features only
cv_scores_important = cross_val_score(best_rf, X_important, y, cv=5, scoring='neg_mean_squared_error')
cv_rmse_scores_important = np.sqrt(-cv_scores_important)
print("Cross-Validated RMSE with Important Features:", cv_rmse_scores_important.mean())


# Future predictions with important features only
future_data = pd.DataFrame()
last_date = data['Date'].max()
new_dates = pd.date_range(start=last_date + timedelta(days=1), periods=7)

for date in new_dates:
    last_entries = data.drop_duplicates(subset=['Beach Name'], keep='last').copy()
    last_entries['Date'] = date
    last_entries['Year'] = date.year
    last_entries['Month'] = date.month
    last_entries['DayOfWeek'] = date.dayofweek
    future_encoded = pd.get_dummies(last_entries, columns=['Beach Name', 'Location_ecoli', 'Nearest Weather Station'])
    future_encoded = future_encoded.reindex(columns=X_important.columns, fill_value=0)
    future_predictions = best_rf.predict(future_encoded)
    
    predictions_df = pd.DataFrame(future_predictions, columns=['Predicted Ecoli Level', 'Predicted DNA Reading Mean'], index=future_encoded.index)
    future_data = pd.concat([future_data, pd.concat([last_entries[['Date', 'Beach Name']], predictions_df], axis=1)])

# Organize data by Beach and Date
organized_data = {}
for index, row in future_data.iterrows():
    beach = row['Beach Name']
    date = row['Date'].strftime('%Y-%m-%d')
    if beach not in organized_data:
        organized_data[beach] = {}
    organized_data[beach][date] = {'Predicted Ecoli Level': row['Predicted Ecoli Level'], 'Predicted DNA Reading Mean': row['Predicted DNA Reading Mean']}

# Convert organized data to JSON
json_data = json.dumps(organized_data, indent=4)

print("Current Working Directory:", os.getcwd())

# Convert organized data to JSON
folder_path = os.path.join('beaches', 'public')
file_name = 'beach_predictions.json'
full_path = os.path.join(folder_path, file_name)
# Save to file
with open(full_path, 'w') as file:
    file.write(json_data)

print("JSON data saved to 'beach_predictions.json'")