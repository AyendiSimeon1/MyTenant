import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Property {
    title: string;
    description: string;
    image: File;
    price: string;
    location: string; 
}

const AllProperties =  async() => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProperty = async () => {
            const url = 'http://localhost:3000/agent/properties';
        try {
            const response = await axios.get(url);
            setProperties(response.data);
        } catch(error) {
            console.log(error);
            // setError(error);
        } 
        }
        fetchProperty();

    }, []);
    <div className='mt-5'>
        <h1>{error}</h1>
        <h1 className='font-medium'>Recently Added</h1>
        
        {properties.map((property, index) => (
        <div key='index' className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white">
            <div className="relative h-48 w-full">
                <Image
                src={property.image}
                alt={property.title}
                layout="fill"
                objectFit="cover"
                />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{properties.title}</div>
                <p className="text-gray-700 text-base mb-2">
                <span className="font-semibold">Price:</span> ${property.price}
                </p>
                <p className="text-gray-700 text-base">
                <span className="font-semibold">Location:</span> {property.location}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <Link href={`/property/${id}`}>
                <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">
                    View Details
                </a>
                </Link>
            </div>
        </div>
            
        
        })}
    </div>


}

export default AllProperties;