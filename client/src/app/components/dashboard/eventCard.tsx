interface EventCardProps {
    title: string;
    description: string;
    startTime: string;
    price: string;
  }
  
  const EventCard: React.FC<EventCardProps> = ({ title, description, startTime, price }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">{title}</h3>
        <p>{description}</p>
        <p>Start Time: {startTime}</p>
        <p>${price}</p>
      </div>
    );
  };
  
  export default EventCard;
  