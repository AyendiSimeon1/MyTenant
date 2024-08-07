"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface Property {
  _id: number;
  title: string;
  image: {
    url: string,
    contentType: string;
  };
  description: string;
  price: string;
  bedrooms: number;
  location: string;
}

const PropertyCard: React.FC<Property> = ({
  title,
  image,
  description,
  price,
  bedrooms,
  location,
}) => {
  

 
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative w-full md:w-1/2 h-48 md:h-auto">
        <Image
          src={image.url}
          alt="Hello"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between w-full md:w-1/2">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{description}</h2>
          <p className="text-gray-600">{location}</p>
          <p className="text-gray-700">{bedrooms} Bedrooms</p>
          <p className="text-lg font-bold text-blue-600">{price}</p>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md transition-all duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 animate-pulse"
          onClick={() => alert('Booking functionality to be implemented')}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

const PropertyList: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchProperties = async () => {
        try {
          const response = await axios.get<Property[]>('https://mytenant.onrender.com/api/v1/agents/properties');
          setProperties(response.data);
          console.log(response.data);
          console.log("hello");
          setLoading(false);
          
        } catch (err) {
          setError('Failed to fetch properties');
          setLoading(false);
        }
      };
  
      fetchProperties();
      
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Popular Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property._id} {...property} />
          ))}
        </div>
      </div>
    );
  };
  
  export default PropertyList;