import React from 'react';
import { X } from 'lucide-react';
import { usePredictions } from '../../contexts/PredictionContext';
import { CrimeType, RiskLevel } from '../../types';

interface FilterPanelProps {
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ className = '' }) => {
  const { filters, setFilters } = usePredictions();

  const crimeTypes: CrimeType[] = [
    'ASSAULT',
    'BURGLARY',
    'THEFT',
    'ROBBERY',
    'VEHICLE_THEFT',
    'HOMICIDE',
    'VANDALISM',
    'OTHER'
  ];

  const riskLevels: RiskLevel[] = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  const handleCrimeTypeToggle = (crimeType: CrimeType) => {
    let updatedCrimeTypes: CrimeType[];
    
    if (filters.crimeTypes.includes(crimeType)) {
      updatedCrimeTypes = filters.crimeTypes.filter(type => type !== crimeType);
    } else {
      updatedCrimeTypes = [...filters.crimeTypes, crimeType];
    }
    
    setFilters({ crimeTypes: updatedCrimeTypes });
  };

  const handleRiskLevelToggle = (riskLevel: RiskLevel) => {
    let updatedRiskLevels: RiskLevel[];
    
    if (filters.riskLevels.includes(riskLevel)) {
      updatedRiskLevels = filters.riskLevels.filter(level => level !== riskLevel);
    } else {
      updatedRiskLevels = [...filters.riskLevels, riskLevel];
    }
    
    setFilters({ riskLevels: updatedRiskLevels });
  };

  const clearFilters = () => {
    setFilters({
      crimeTypes: [],
      riskLevels: [],
      zones: []
    });
  };

  return (
    <div className={`card p-4 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-800 dark:hover:text-primary-400"
        >
          Clear all
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crime Types */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Crime Types</h4>
          <div className="flex flex-wrap gap-2">
            {crimeTypes.map(crimeType => (
              <button
                key={crimeType}
                onClick={() => handleCrimeTypeToggle(crimeType)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  filters.crimeTypes.includes(crimeType)
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-500'
                }`}
              >
                {crimeType.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
        
        {/* Risk Levels */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Risk Levels</h4>
          <div className="flex flex-wrap gap-2">
            {riskLevels.map(riskLevel => {
              let bgColor = '';
              if (filters.riskLevels.includes(riskLevel)) {
                bgColor = 'bg-primary-600 text-white';
              } else {
                switch (riskLevel) {
                  case 'LOW':
                    bgColor = 'bg-success-100 dark:bg-success-900/20 text-success-800 dark:text-success-400 hover:bg-success-200 dark:hover:bg-success-900/30';
                    break;
                  case 'MEDIUM':
                    bgColor = 'bg-warning-100 dark:bg-warning-900/20 text-warning-800 dark:text-warning-400 hover:bg-warning-200 dark:hover:bg-warning-900/30';
                    break;
                  case 'HIGH':
                    bgColor = 'bg-accent-100 dark:bg-accent-900/20 text-accent-800 dark:text-accent-400 hover:bg-accent-200 dark:hover:bg-accent-900/30';
                    break;
                  case 'CRITICAL':
                    bgColor = 'bg-error-100 dark:bg-error-900/20 text-error-800 dark:text-error-400 hover:bg-error-200 dark:hover:bg-error-900/30';
                    break;
                  default:
                    bgColor = 'bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-500';
                }
              }
              
              return (
                <button
                  key={riskLevel}
                  onClick={() => handleRiskLevelToggle(riskLevel)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${bgColor}`}
                >
                  {riskLevel}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;