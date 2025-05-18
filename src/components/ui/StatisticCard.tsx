import React from 'react';
import { TrendingUp, TrendingDown, FlipHorizontal as MinusHorizontal } from 'lucide-react';

interface StatisticCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'same';
  trendValue?: string;
  trendDirection?: 'good' | 'bad' | 'neutral';
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  title,
  value,
  icon,
  trend = 'same',
  trendValue = '0%',
  trendDirection = 'neutral'
}) => {
  const renderTrendIcon = () => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4" />;
    } else if (trend === 'down') {
      return <TrendingDown className="h-4 w-4" />;
    }
    return <MinusHorizontal className="h-4 w-4" />;
  };

  const getTrendColor = () => {
    if (trendDirection === 'good') {
      return 'text-success-600';
    } else if (trendDirection === 'bad') {
      return 'text-accent-600';
    }
    return 'text-gray-500 dark:text-gray-400';
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <div className="bg-primary-100 dark:bg-primary-900/20 p-2 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mb-3">
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`flex items-center text-sm ${getTrendColor()}`}>
        {renderTrendIcon()}
        <span className="ml-1">{trendValue} vs. previous period</span>
      </div>
    </div>
  );
};

export default StatisticCard;