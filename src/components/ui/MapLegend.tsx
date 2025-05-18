import React from 'react';

const MapLegend: React.FC = () => {
  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-4">Legend</h3>
      
      <div className="space-y-4">
        {/* Risk Level */}
        <div>
          <h4 className="text-sm font-medium mb-2">Risk Level</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-success-500 mr-2"></div>
              <span className="text-sm">Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-warning-500 mr-2"></div>
              <span className="text-sm">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-accent-500 mr-2"></div>
              <span className="text-sm">High</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-error-600 mr-2"></div>
              <span className="text-sm">Critical</span>
            </div>
          </div>
        </div>
        
        {/* Crime Types */}
        <div>
          <h4 className="text-sm font-medium mb-2">Crime Types</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-accent-500 mr-2"></div>
              <span className="text-xs">Assault</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-primary-500 mr-2"></div>
              <span className="text-xs">Burglary</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-success-500 mr-2"></div>
              <span className="text-xs">Theft</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-warning-500 mr-2"></div>
              <span className="text-xs">Robbery</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-secondary-500 mr-2"></div>
              <span className="text-xs">Vehicle Theft</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-error-600 mr-2"></div>
              <span className="text-xs">Homicide</span>
            </div>
          </div>
        </div>
        
        {/* Map Features */}
        <div>
          <h4 className="text-sm font-medium mb-2">Map Features</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full border-2 border-white bg-gray-500 mr-2"></div>
              <span className="text-sm">Prediction Point</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-3 rounded-full bg-accent-200 opacity-50 mr-2"></div>
              <span className="text-sm">Heat Area</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapLegend;