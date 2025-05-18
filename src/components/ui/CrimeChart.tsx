import React, { useMemo } from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Prediction, CrimeType, RiskLevel } from '../../types';
import { useTheme } from '../../contexts/ThemeContext';

interface CrimeChartProps {
  predictions: Prediction[];
  chartType: 'bar' | 'pie';
}

const CrimeChart: React.FC<CrimeChartProps> = ({ predictions, chartType }) => {
  const { theme } = useTheme();
  
  const crimeTypeColors = {
    ASSAULT: '#f87171', // red-400
    BURGLARY: '#60a5fa', // blue-400
    THEFT: '#4ade80', // green-400
    ROBBERY: '#f59e0b', // amber-500
    VEHICLE_THEFT: '#8b5cf6', // violet-500
    HOMICIDE: '#ef4444', // red-500
    VANDALISM: '#a78bfa', // violet-400
    OTHER: '#9ca3af', // gray-400
  };

  const riskLevelColors = {
    LOW: '#4ade80', // green-400
    MEDIUM: '#f59e0b', // amber-500
    HIGH: '#f87171', // red-400
    CRITICAL: '#ef4444', // red-500
  };

  // Prepare data for crime type chart
  const crimeTypeData = useMemo(() => {
    const counts: Record<CrimeType, number> = {
      ASSAULT: 0,
      BURGLARY: 0,
      THEFT: 0,
      ROBBERY: 0,
      VEHICLE_THEFT: 0,
      HOMICIDE: 0,
      VANDALISM: 0,
      OTHER: 0,
    };

    predictions.forEach(prediction => {
      counts[prediction.crimeType] += prediction.crimeCount;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .filter(item => item.value > 0)
      .sort((a, b) => b.value - a.value);
  }, [predictions]);

  // Prepare data for risk level chart
  const riskLevelData = useMemo(() => {
    const counts: Record<RiskLevel, number> = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0,
      CRITICAL: 0,
    };

    predictions.forEach(prediction => {
      counts[prediction.riskLevel] += 1;
    });

    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .filter(item => item.value > 0);
  }, [predictions]);

  const textColor = theme === 'dark' ? '#e5e7eb' : '#4b5563';
  const gridColor = theme === 'dark' ? '#374151' : '#e5e7eb';

  if (predictions.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No data available</p>
      </div>
    );
  }

  if (chartType === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={crimeTypeData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis 
            dataKey="name" 
            tick={{ fill: textColor }} 
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis tick={{ fill: textColor }} />
          <Tooltip 
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
              color: textColor
            }}
          />
          <Bar dataKey="value" name="Count">
            {crimeTypeData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={crimeTypeColors[entry.name as CrimeType] || '#9ca3af'} 
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={riskLevelData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {riskLevelData.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={riskLevelColors[entry.name as RiskLevel] || '#9ca3af'} 
            />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderColor: theme === 'dark' ? '#374151' : '#e5e7eb',
            color: textColor
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CrimeChart;