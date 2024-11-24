import React from 'react';
import CircularProgress from './CircularProgress';

const SafetyMetricsDisplay = ({ safetyScore, populationDensity, perCapitaIncome }) => {
  const getColorClass = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-sm">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <CircularProgress
              value={safetyScore}
              size={60}
              strokeWidth={6}
              className={getColorClass(safetyScore)}
            />
            <span className="mt-2 text-sm font-medium">Safety Score</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-end h-16">
              <div 
                className="w-4 bg-blue-500 rounded-t"
                style={{ height: `${Math.min(populationDensity / 10, 100)}%` }}
              ></div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="mt-2 text-blue-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="mt-1 text-xs">{populationDensity}/km²</span>
          </div>
          
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-green-500" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
            <span className="mt-1 text-lg font-bold">{perCapitaIncome.toLocaleString()}</span>
            <span className="text-xs">Per Capita</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMetricsDisplay;

