interface StatCardProps {
    title: string;
    value: number | string; // Allow both number and string values
  }
  
  const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold">{title}</h2>
        <p>{value}</p>
      </div>
    );
  };
  
  export default StatCard;
  