import React from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/4 py-2">First Name</th>
            <th className="w-1/4 py-2">Last Name</th>
            <th className="w-1/4 py-2">Email</th>
            <th className="w-1/4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="w-1/4 py-2 px-4">{user.firstName}</td>
              <td className="w-1/4 py-2 px-4">{user.lastName}</td>
              <td className="w-1/4 py-2 px-4">{user.email}</td>
              <td className="w-1/4 py-2 px-4">
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

export default UserTable;
