import React, { useState, useEffect } from 'react';
import { Map, Layers, AlertTriangle, Filter, EyeOff, Eye } from 'lucide-react';
import { usePredictions } from '../../contexts/PredictionContext';
import CrimeMap from '../ui/CrimeMap';
import FilterPanel from '../ui/FilterPanel';
import MapLegend from '../ui/MapLegend';
import LoadingIndicator from '../ui/LoadingIndicator';

const MapView: React.FC = () => {
  const { 
    filteredPredictions, 
    loading, 
    error, 
    mapSettings, 
    setMapSettings
  } = usePredictions();
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleMapSetting = (setting: keyof typeof mapSettings) => {
    setMapSettings({
      [setting]: !mapSettings[setting]
    });
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <Map className="h-8 w-8 mr-2 text-primary-600" />
            Crime Prediction Map
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Interactive visualization of predicted crime patterns across Los Angeles.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => toggleMapSetting('showHeatmap')}
              className={`btn ${mapSettings.showHeatmap ? 'btn-primary' : 'btn-ghost'} flex items-center`}
            >
              {mapSettings.showHeatmap ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              Heatmap
            </button>
            <button 
              onClick={() => toggleMapSetting('showZoneBoundaries')}
              className={`btn ${mapSettings.showZoneBoundaries ? 'btn-primary' : 'btn-ghost'} flex items-center`}
            >
              {mapSettings.showZoneBoundaries ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              Zone Boundaries
            </button>
            <button 
              onClick={() => toggleMapSetting('showPredictionMarkers')}
              className={`btn ${mapSettings.showPredictionMarkers ? 'btn-primary' : 'btn-ghost'} flex items-center`}
            >
              {mapSettings.showPredictionMarkers ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
              Markers
            </button>
          </div>
          
          <button 
            onClick={toggleFilters}
            className="btn btn-ghost flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && <FilterPanel className="mb-6" />}

        {/* Loading and Error States */}
        {loading && (
          <div className="my-12">
            <LoadingIndicator />
          </div>
        )}

        {error && (
          <div className="my-12 card p-6 flex items-center text-accent-700">
            <AlertTriangle className="h-6 w-6 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {/* Map and Legend */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <CrimeMap predictions={filteredPredictions} />
          </div>
          <div className="lg:col-span-1">
            <MapLegend />
            
            {/* Stats Panel */}
            <div className="card p-4 mt-6">
              <h3 className="text-lg font-semibold mb-3">Map Statistics</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Visible predictions:</span>
                  <span className="font-medium">{filteredPredictions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">High risk zones:</span>
                  <span className="font-medium text-accent-600">
                    {filteredPredictions.filter(p => p.riskLevel === 'HIGH' || p.riskLevel === 'CRITICAL').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Date range:</span>
                  <span className="font-medium">8 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;