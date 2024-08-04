import Image from 'next/image';

const properties = [
  {
    id: 1,
    name: 'Heathfield House',
    location: 'Heathfield, East Sussex, TN21, United Kingdom',
    price: 5500,
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    image: '/path/to/heathfield-house.jpg'
  },
  {
    id: 2,
    name: 'Somerset Court',
    location: 'Somerset, BA4, United Kingdom',
    price: 1500,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: '/path/to/somerset-court.jpg'
  },
  {
    id: 3,
    name: 'Wilton Lodge',
    location: 'Wilton, Wiltshire, SP2, United Kingdom',
    price: 3000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    image: '/path/to/wilton-lodge.jpg'
  }
];

export default function NewProperties() {
  return (
    <div className="bg-blue-50 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">New properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="relative h-48">
              <Image
                src={property.image}
                alt={property.name}
                layout="fill"
                objectFit="cover"
              />
              <span className="absolute top-2 right-2 bg-white text-gray-800 px-2 py-1 rounded-full text-xs">
                {property.bedrooms} bd | {property.bathrooms} ba | {property.area} sqft
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{property.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{property.location}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-xl">£{property.price.toLocaleString()}/month</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}