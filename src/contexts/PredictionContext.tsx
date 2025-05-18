import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Prediction, PredictionFilters, MapSettings, DateRange } from '../types';
import { fetchPredictions } from '../services/predictionService';
import { addDays, format } from 'date-fns';

interface PredictionContextType {
  predictions: Prediction[];
  loading: boolean;
  error: string | null;
  filters: PredictionFilters;
  mapSettings: MapSettings;
  setFilters: (filters: Partial<PredictionFilters>) => void;
  setMapSettings: (settings: Partial<MapSettings>) => void;
  refreshPredictions: () => Promise<void>;
  filteredPredictions: Prediction[];
}

const defaultDateRange: DateRange = {
  startDate: format(new Date(), 'yyyy-MM-dd'),
  endDate: format(addDays(new Date(), 7), 'yyyy-MM-dd')
};

const defaultFilters: PredictionFilters = {
  crimeTypes: [],
  riskLevels: [],
  zones: [],
  dateRange: defaultDateRange
};

const defaultMapSettings: MapSettings = {
  showHeatmap: true,
  showZoneBoundaries: true,
  showPredictionMarkers: true
};

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export const PredictionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<PredictionFilters>(defaultFilters);
  const [mapSettings, setMapSettingsState] = useState<MapSettings>(defaultMapSettings);

  const refreshPredictions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPredictions(filters.dateRange);
      setPredictions(data);
    } catch (err) {
      setError('Failed to fetch predictions. Please try again later.');
      console.error('Error fetching predictions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshPredictions();
  }, [filters.dateRange]);

  const setFilters = (newFilters: Partial<PredictionFilters>) => {
    setFiltersState(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  const setMapSettings = (newSettings: Partial<MapSettings>) => {
    setMapSettingsState(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  const filteredPredictions = predictions.filter(prediction => {
    // Filter by crime type
    if (filters.crimeTypes.length > 0 && !filters.crimeTypes.includes(prediction.crimeType)) {
      return false;
    }
    
    // Filter by risk level
    if (filters.riskLevels.length > 0 && !filters.riskLevels.includes(prediction.riskLevel)) {
      return false;
    }
    
    // Filter by zone
    if (filters.zones.length > 0 && !filters.zones.includes(prediction.zone)) {
      return false;
    }
    
    return true;
  });

  return (
    <PredictionContext.Provider 
      value={{ 
        predictions, 
        loading, 
        error, 
        filters, 
        mapSettings, 
        setFilters, 
        setMapSettings, 
        refreshPredictions,
        filteredPredictions 
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
};

export const usePredictions = (): PredictionContextType => {
  const context = useContext(PredictionContext);
  if (context === undefined) {
    throw new Error('usePredictions must be used within a PredictionProvider');
  }
  return context;
};