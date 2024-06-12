interface BookingCardProps {
  title: string;
  roomType: string;
  startTime: string;
  endTime: string;
  status: string; // Possible values: 'Confirmed', 'Pending', 'Rejected'
}

const BookingCard: React.FC<BookingCardProps> = ({ title, roomType, startTime, endTime, status }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p>Room Type: {roomType}</p>
      <p>Start Time: {startTime}</p>
      <p>End Time: {endTime}</p>
      <p className={`font-semibold ${status === 'Confirmed' ? 'text-green-600' : status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
        {status}
      </p>
    </div>
  );
};

export default BookingCard;
