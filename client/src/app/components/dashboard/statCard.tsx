import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 flex items-center space-x-4">
      {icon && (
        <span className="text-2xl">
          <i className={`fas fa-${icon}`}></i>
        </span>
      )}
      <div>
        <h2 className="text-xl font-bold text-darkBlue">{title}</h2>
        <p className="text-lg text-gray-600">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
