import React from 'react';
import { Github, Brain } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex items-center">
            <Brain className="h-6 w-6 text-primary-600 mr-2" strokeWidth={1.5} />
            <span className="text-lg font-bold text-primary-600">NeuralCrime</span>
          </div>
          
          <div className="text-center md:text-left mb-6 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Predicting crime patterns in Los Angeles using advanced AI and machine learning.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://github.com/CamiloAndresDG/Crime_Prediction_LA" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-500 transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-700 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} NeuralCrime. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;