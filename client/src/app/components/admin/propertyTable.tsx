import React from 'react';

interface Property {
  id: string;
  address: string;
  type: string;
}

interface PropertyTableProps {
  properties: Property[];
}

const PropertyTable: React.FC<PropertyTableProps> = ({ properties }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/3 py-2">Address</th>
            <th className="w-1/3 py-2">Type</th>
            <th className="w-1/3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {properties.map((property) => (
            <tr key={property.id}>
              <td className="w-1/3 py-2 px-4">{property.address}</td>
              <td className="w-1/3 py-2 px-4">{property.type}</td>
              <td className="w-1/3 py-2 px-4">
                <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Edit</button>
                <button className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyTable;
