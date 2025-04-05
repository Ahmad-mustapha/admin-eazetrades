import React from 'react';
import { IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { IconType } from 'react-icons';

// --- Type Definition (if not imported) ---
interface StatItem {
    id: string;
    label: string;
    value: number;
    comparisonText: string;
    percentageChange: number;
    trend: IconType; // Use IconType or React.ElementType
    colorClass: string;
}

const statsData: StatItem[] = [
  {
    id: 'new-users',
    label: 'New users',
    value: 400,
    comparisonText: 'vs yesterday',
    percentageChange: -0.005,
    trend: IoMdTrendingDown, // Store the component itself
    colorClass: 'bg-black',
  },
  {
    id: 'return-visitors',
    label: 'Return visitors',
    value: 3000,
    comparisonText: 'vs yesterday',
    percentageChange: -0.005,
    trend: IoMdTrendingDown,
    colorClass: 'bg-purple-500',
  },
  {
    id: 'total-visitors',
    label: 'Total visitors',
    value: 7103,
    comparisonText: 'vs yesterday',
    percentageChange: -0.005, // Keeping as per user data
    trend: IoMdTrendingUp, // Store the component itself
    colorClass: 'bg-gray-200',
  },
];

// --- Helper to format percentage ---
const formatPercentage = (value: number): string => {
  const sign = value > 0 ? '+' : '';
  // Consider formatting the percentage more nicely, e.g., multiplying by 100
  // return `(${sign}${(value * 100).toFixed(3)}%)`; // Example: ( -0.500%)
  // Or keep as is if the raw value is intended:
   return `(${sign}${value}%)`;
};


// --- Component (Updated) ---
const StatsDisplay: React.FC = () => { // Use React.FC for typing
  return (
    <div className="p-6 w-full">
      <div className="space-y-8">
        {statsData.map((item: StatItem) => { // Explicitly type item
          // Determine if the trend is down by comparing the component reference
          const isTrendDown = item.trend === IoMdTrendingDown;
          // Set color based on the trend direction
          const comparisonColor = isTrendDown ? 'text-red-500' : 'text-teal-500'; // Use red for down, teal/green for up

          // Get the icon component directly from the item
          // Assign to a capitalized variable because JSX requires component names to start with a capital letter
          const TrendIcon = item.trend;

          return (
            <div key={item.id} className="flex items-start space-x-3">
              {/* Indicator Dot */}
              <div className={`w-3 h-3 ${item.colorClass} rounded-full mt-1 flex-shrink-0`}></div>

              {/* Text Content Block */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 truncate">{item.label}</p>
                <p className="text-[32px] font-semibold text-gray-900 mt-1">
                  {item.value.toLocaleString()}
                </p>
                <div className={`flex items-center space-x-1 mt-1 ${comparisonColor}`}>
                  <span className="text-[21px]">
                    {item.comparisonText} {formatPercentage(item.percentageChange)}
                  </span>
                  {/* Render the icon component stored in TrendIcon */}
                  <TrendIcon className="w-4 h-4 flex-shrink-0" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Ensure component name starts with an uppercase letter if it's intended to be used as a JSX tag directly
// It's convention to capitalize component names.
// export default Statsdisplay; // Original name
export default StatsDisplay; // Renamed to conventional capitalization