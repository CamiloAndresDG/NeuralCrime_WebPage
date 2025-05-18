import React from 'react';
import { Brain, LineChart, Map, Layers, Search, Database, Clock, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-16 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-4">
            <Brain className="h-16 w-16 text-primary-600" strokeWidth={1.5} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About NeuralCrime
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A sophisticated machine learning pipeline that predicts crime patterns in Los Angeles
            using PySpark and advanced analytics.
          </p>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 text-primary-600">
                <Database className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-time Data Integration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Automated data ingestion from LA's official crime database with continuous updates.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 text-primary-600">
                <Map className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Zone-Specific Predictions</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Customized prediction models tailored for each LAPD district for greater accuracy.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 text-primary-600">
                <Layers className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-Model Approach</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Combines crime type classification, count prediction, and location-based pattern recognition.
              </p>
            </div>
            
            <div className="card p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4 text-primary-600">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">8-Day Forecasting</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Rolling predictions updated every 8 days to provide a consistent forward-looking window.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          
          <div className="card p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900/30 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Database className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Data Collection</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Historical crime data is collected from LA's crime database and processed using PySpark.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900/30 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Model Training</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Machine learning models are trained on temporal and spatial features to identify patterns.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-primary-100 dark:bg-primary-900/30 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LineChart className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Prediction Generation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Trained models generate 8-day forecasts for different zones and crime types across LA.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Structure */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Project Structure</h2>
          
          <div className="card p-6 overflow-hidden">
            <pre className="text-sm bg-gray-100 dark:bg-dark-900 p-4 rounded-lg overflow-x-auto">
{`Crime_Prediction_LA/
├── src/
│ ├── data/
│ │ └── data_ingestion.py # Data download and storage
│ ├── processing/
│ │ └── data_processor.py # PySpark data processing
│ ├── models/
│ │ └── crime_predictor.py # Prediction models
│ └── pipeline.py # Main pipeline orchestrator
├── data/
│ └── raw/ # Raw data storage
├── predictions/ # Prediction outputs
├── notebooks/ # Jupyter notebooks
├── tests/ # Unit tests
├── requirements.txt # Project dependencies
└── README.md # Project documentation`}
            </pre>
          </div>
        </section>

        {/* GitHub Link */}
        <section className="mb-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Project Repository</h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Explore the full codebase and contribute to the project.
          </p>
          <a 
            href="https://github.com/CamiloAndresDG/Crime_Prediction_LA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View on GitHub
          </a>
        </section>
      </div>
    </div>
  );
};

export default About;