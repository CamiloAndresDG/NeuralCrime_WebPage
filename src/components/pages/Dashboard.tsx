import React, { useState } from 'react';
import { BarChart3, Calendar, Filter, RefreshCw, AlertTriangle } from 'lucide-react';
import { usePredictions } from '../../contexts/PredictionContext';
import StatisticCard from '../ui/StatisticCard';
import CrimeChart from '../ui/CrimeChart';
import FilterPanel from '../ui/FilterPanel';
import DateRangePicker from '../ui/DateRangePicker';
import LoadingIndicator from '../ui/LoadingIndicator';

const Dashboard: React.FC = () => {
  const { filteredPredictions, loading, error, refreshPredictions } = usePredictions();
  const [showFilters, setShowFilters] = useState(false);

  // Calculate statistics
  const totalPredictions = filteredPredictions.length;
  
  const highRiskCount = filteredPredictions.filter(
    p => p.riskLevel === 'HIGH' || p.riskLevel === 'CRITICAL'
  ).length;
  
  const mostCommonCrimeType = getMostCommonCrimeType(filteredPredictions);
  
  const zones = [...new Set(filteredPredictions.map(p => p.zone))];
  
  // Get total crime count across all predictions
  const totalCrimeCount = filteredPredictions.reduce(
    (sum, prediction) => sum + prediction.crimeCount, 
    0
  );

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleRefresh = () => {
    refreshPredictions();
  };

  return (
    <div className="pt-24 pb-16 px-4 md:px-8">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
            <BarChart3 className="h-8 w-8 mr-2 text-primary-600" />
            Crime Prediction Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Real-time insights and predictions for crime patterns in Los Angeles.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center space-x-2">
            <DateRangePicker />
          </div>

          <div className="flex space-x-2">
            <button 
              onClick={toggleFilters}
              className="btn btn-ghost flex items-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
            <button 
              onClick={handleRefresh}
              className="btn btn-primary flex items-center"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && <FilterPanel />}

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

        {/* Statistics Overview */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatisticCard 
              title="Total Predictions" 
              value={totalPredictions.toString()} 
              icon={<BarChart3 className="h-5 w-5 text-primary-600" />}
              trend="up"
              trendValue="12%"
            />
            <StatisticCard 
              title="High Risk Incidents" 
              value={highRiskCount.toString()} 
              icon={<AlertTriangle className="h-5 w-5 text-accent-600" />}
              trend="up"
              trendValue="8%"
              trendDirection="bad"
            />
            <StatisticCard 
              title="Total Crime Count" 
              value={totalCrimeCount.toString()} 
              icon={<BarChart3 className="h-5 w-5 text-secondary-600" />}
              trend="down"
              trendValue="3%"
              trendDirection="good"
            />
            <StatisticCard 
              title="Zones Affected" 
              value={zones.length.toString()} 
              icon={<Calendar className="h-5 w-5 text-warning-600" />}
              trend="same"
              trendValue="0%"
            />
          </div>
        )}

        {/* Charts */}
        {!loading && !error && filteredPredictions.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-4">Crime Type Distribution</h3>
              <CrimeChart predictions={filteredPredictions} chartType="bar" />
            </div>
            <div className="card p-4">
              <h3 className="text-lg font-semibold mb-4">Risk Level Distribution</h3>
              <CrimeChart predictions={filteredPredictions} chartType="pie" />
            </div>
          </div>
        )}

        {/* No data state */}
        {!loading && !error && filteredPredictions.length === 0 && (
          <div className="card p-8 text-center my-12">
            <h3 className="text-xl font-semibold mb-2">No prediction data available</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters or date range to see predictions.
            </p>
            <button 
              onClick={handleRefresh}
              className="btn btn-primary"
            >
              Refresh Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to get the most common crime type
function getMostCommonCrimeType(predictions: any[]): string {
  if (predictions.length === 0) return 'N/A';
  
  const typeCounts: Record<string, number> = {};
  
  predictions.forEach(prediction => {
    if (typeCounts[prediction.crimeType]) {
      typeCounts[prediction.crimeType]++;
    } else {
      typeCounts[prediction.crimeType] = 1;
    }
  });
  
  let maxType = '';
  let maxCount = 0;
  
  Object.entries(typeCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxType = type;
    }
  });
  
  return maxType;
}

export default Dashboard;