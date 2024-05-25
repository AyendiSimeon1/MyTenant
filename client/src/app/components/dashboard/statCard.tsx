import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: string; // Optional icon name for the stat
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6">
      {icon && (
        <span className="mr-2">
          {/* Replace with your chosen icon library and icon name */}
          <i className={`fas fa-${icon}`}></i>
        </span>
      )}
      <h2 className="text-xl font-bold text-darkBlue">{title}</h2>
      <p className="text-lg text-gray-600">{value}</p>
    </div>
  );
};

export default StatCard;
