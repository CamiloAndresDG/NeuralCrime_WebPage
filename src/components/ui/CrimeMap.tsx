import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Prediction } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';
import { AlertTriangle } from 'lucide-react';

interface CrimeMapProps {
  predictions: Prediction[];
}

const CrimeMap: React.FC<CrimeMapProps> = ({ predictions }) => {
  const { theme } = useTheme();
  const [mapLoaded, setMapLoaded] = useState(false);

  // LA coordinates
  const defaultCenter: [number, number] = [34.0522, -118.2437];
  const defaultZoom = 11;

  const getMarkerIcon = (riskLevel: string) => {
    let color;
    switch (riskLevel) {
      case 'LOW':
        color = '#22c55e'; // success-500
        break;
      case 'MEDIUM':
        color = '#f59e0b'; // warning-500
        break;
      case 'HIGH':
        color = '#ff3f30'; // accent-500
        break;
      case 'CRITICAL':
        color = '#dc2626'; // error-600
        break;
      default:
        color = '#6377f5'; // primary-500
    }

    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div style="background-color: ${color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
      iconSize: [12, 12],
      iconAnchor: [6, 6]
    });
  };

  // Component to set the map theme
  const MapTheme = () => {
    const map = useMap();
    
    useEffect(() => {
      // Set map theme based on dark/light mode
      if (theme === 'dark') {
        // Dark theme
        map.getContainer().classList.add('dark-theme');
      } else {
        // Light theme
        map.getContainer().classList.remove('dark-theme');
      }
      
      setMapLoaded(true);
    }, [theme, map]);
    
    return null;
  };

  // Custom component to auto-center map on predictions
  const FitBoundsToPredictions = ({ predictions }: { predictions: Prediction[] }) => {
    const map = useMap();
    
    useEffect(() => {
      if (predictions.length > 0) {
        const latLngs = predictions.map(p => [p.latitude, p.longitude] as [number, number]);
        const bounds = L.latLngBounds(latLngs);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [map, predictions]);
    
    return null;
  };

  return (
    <div className="map-container">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-dark-700 rounded-xl z-20">
          <div className="flex space-x-2">
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
            <div className="pulse-dot"></div>
          </div>
        </div>
      )}

      <MapContainer 
        center={defaultCenter} 
        zoom={defaultZoom} 
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
        className={theme === 'dark' ? 'dark-theme' : ''}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={theme === 'dark' 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
        />
        
        <MapTheme />
        
        {predictions.length > 0 && <FitBoundsToPredictions predictions={predictions} />}
        
        {predictions.map((prediction) => (
          <React.Fragment key={prediction.id}>
            <Marker 
              position={[prediction.latitude, prediction.longitude]}
              icon={getMarkerIcon(prediction.riskLevel)}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-bold mb-1">{prediction.crimeType.replace('_', ' ')}</div>
                  <div>Zone: {prediction.zone}</div>
                  <div>Date: {prediction.date}</div>
                  <div>Risk Level: {prediction.riskLevel}</div>
                  <div>Predicted Count: {prediction.crimeCount}</div>
                </div>
              </Popup>
            </Marker>
            
            <Circle 
              center={[prediction.latitude, prediction.longitude]}
              radius={prediction.crimeCount * 100}
              pathOptions={{
                fillColor: 
                  prediction.riskLevel === 'CRITICAL' ? '#dc2626' :
                  prediction.riskLevel === 'HIGH' ? '#ff3f30' :
                  prediction.riskLevel === 'MEDIUM' ? '#f59e0b' : 
                  '#22c55e',
                fillOpacity: 0.2,
                weight: 1,
                color: 
                  prediction.riskLevel === 'CRITICAL' ? '#dc2626' :
                  prediction.riskLevel === 'HIGH' ? '#ff3f30' :
                  prediction.riskLevel === 'MEDIUM' ? '#f59e0b' : 
                  '#22c55e',
                opacity: 0.5
              }}
            />
          </React.Fragment>
        ))}
      </MapContainer>
      
      {predictions.length === 0 && mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-dark-800/70 rounded-xl z-20">
          <div className="bg-white dark:bg-dark-700 p-4 rounded-lg shadow-lg max-w-sm text-center">
            <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-warning-500" />
            <h3 className="text-lg font-semibold mb-2">No prediction data</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting the filters or date range to view crime predictions on the map.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrimeMap;