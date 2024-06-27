# Beach Water Quality Prediction
Contributors: Celina Anwar, Warren Lam, Swathi Sureshmoorthy, Caleb Peach, Aditi Kumar, and Leor Porat

This project predicts E. coli and Enterococci levels for Chicago beaches using machine learning. It leverages data from various sources to make these predictions and saves the results in a JSON file. The project includes a frontend written with Next.js in Typescript to display the prediction.

## Datasets

The following datasets are used in this project:

1. **[Beach Lab Data](https://data.cityofchicago.org/Parks-Recreation/Beach-Lab-Data/2ivx-z93u/about_data)**
2. **[Beach E.coli Predictions](https://data.cityofchicago.org/Parks-Recreation/Beach-E-coli-Predictions/xvsz-3xcj/about_data)**
3. **[Beach Weather Stations](https://data.cityofchicago.org/Parks-Recreation/Beach-Weather-Stations-Automated-Sensors/k7hf-8y75/data_preview)**

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/aditi135/rphackathon.git
cd rphackathon/beaches
```
**Make sure you are in beaches!!**

### 2. Set Up Python Virtual Environment
Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Python Dependencies
Install the required Python packages:
```bash
pip install -r requirements.txt
```

### 4. Run the Next.js Development Server
Start the development server:
```bash
npm install
npm run dev
```

## Acknowledgments
- City of Chicago for providing the datasets.
- The open-source community for the tools and libraries used in this project.
