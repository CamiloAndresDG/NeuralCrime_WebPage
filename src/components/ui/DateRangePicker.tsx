import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePredictions } from '../../contexts/PredictionContext';
import { format, addDays, parse, isBefore, isAfter } from 'date-fns';

const DateRangePicker: React.FC = () => {
  const { filters, setFilters } = usePredictions();
  const [isOpen, setIsOpen] = useState(false);

  const formatDisplayDate = (dateStr: string) => {
    const date = parse(dateStr, 'yyyy-MM-dd', new Date());
    return format(date, 'MMM dd, yyyy');
  };

  const handlePreviousPeriod = () => {
    const startDate = parse(filters.dateRange.startDate, 'yyyy-MM-dd', new Date());
    const endDate = parse(filters.dateRange.endDate, 'yyyy-MM-dd', new Date());
    
    const daysDiff = 8; // 8-day period
    
    const newStartDate = addDays(startDate, -daysDiff);
    const newEndDate = addDays(endDate, -daysDiff);
    
    setFilters({
      dateRange: {
        startDate: format(newStartDate, 'yyyy-MM-dd'),
        endDate: format(newEndDate, 'yyyy-MM-dd')
      }
    });
  };

  const handleNextPeriod = () => {
    const startDate = parse(filters.dateRange.startDate, 'yyyy-MM-dd', new Date());
    const endDate = parse(filters.dateRange.endDate, 'yyyy-MM-dd', new Date());
    
    const daysDiff = 8; // 8-day period
    
    const newStartDate = addDays(startDate, daysDiff);
    const newEndDate = addDays(endDate, daysDiff);
    
    // Don't allow future dates beyond today + 8 days
    const maxFutureDate = addDays(new Date(), 8);
    if (isAfter(newEndDate, maxFutureDate)) {
      return;
    }
    
    setFilters({
      dateRange: {
        startDate: format(newStartDate, 'yyyy-MM-dd'),
        endDate: format(newEndDate, 'yyyy-MM-dd')
      }
    });
  };

  const toggleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <button
          onClick={handlePreviousPeriod}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          aria-label="Previous period"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        
        <button
          onClick={toggleDatePicker}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-600 transition-colors"
        >
          <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          <span>
            {formatDisplayDate(filters.dateRange.startDate)} - {formatDisplayDate(filters.dateRange.endDate)}
          </span>
        </button>
        
        <button
          onClick={handleNextPeriod}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          aria-label="Next period"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Date picker dropdown - simplified for this example */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-white dark:bg-dark-700 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-dark-600">
          <div className="text-sm font-medium mb-4">
            Prediction periods are fixed at 8-day intervals
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-primary w-full"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;