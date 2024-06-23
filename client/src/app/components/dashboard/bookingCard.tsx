"use client";
import React from 'react';

interface Property {
  _id: string;
  address: string;
  type: string;
  createdAt: string; // Adjust the type according to your actual data type
  imageUrl: string;
  agencyId: string;
}

interface BookingCardProps {
  property: Property;
}

const BookingCard: React.FC<BookingCardProps> = ({ property }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full" src={property.imageUrl} alt={property.address} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{property.address}</div>
        <p className="text-gray-700 text-base">
          Type: {property.type}
        </p>
        <p className="text-gray-700 text-base">
          Created At: {new Date(property.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Agency: {property.agencyId}</span>
      </div>
    </div>
  );
};

export default BookingCard;
