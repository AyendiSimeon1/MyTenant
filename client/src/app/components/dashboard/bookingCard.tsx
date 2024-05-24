interface BookingCard {
    title: string;
    roomType: string;
    startTime: string;
    endTime: string;
    status: string; // Define possible status types
  }
  
  const BookingCard: React.FC<BookingCard>= ({ title, roomType, startTime, endTime, status }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">{title}</h3>
        <p>{roomType}</p>
        <p>Start Time: {startTime}</p>
        <p>End Time: {endTime}</p>
        <p className={status === 'Confirmed' ? 'text-green-600' : 'text-red-600'}>
          {status}
        </p>
      </div>
    );
  };
  
  export default BookingCard;
  