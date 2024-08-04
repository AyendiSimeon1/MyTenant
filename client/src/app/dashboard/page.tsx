// pages/dashboard.js
"use client";
import React, { useState } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  CashIcon,
  SearchIcon,
  BellIcon,
  MenuAlt2Icon,
} from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';

// Dummy data (replace with real data from your API)
const summaryData = [
  { title: 'Total Applications', value: 101, icon: DocumentTextIcon },
  { title: 'Reviewed Applications', value: 180, icon: CheckCircleIcon },
  { title: 'Pending Inspections', value: 13, icon: HomeIcon },
  { title: 'Total Tenants', value: 10, icon: UserGroupIcon },
];

const recentApplications = [
  { id: 1, name: 'John Doe', property: '123 Main St', status: 'Pending' },
  { id: 2, name: 'Jane Smith', property: '456 Elm St', status: 'Approved' },
  { id: 3, name: 'Bob Johnson', property: '789 Oak St', status: 'Rejected' },
];

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <h1 className="text-white text-2xl font-bold">MyTenant</h1>
        </div>
        <nav className="mt-8">
          {/* <NavItem icon={HomeIcon} title="Dashboard" active />
          <NavItem icon={DocumentTextIcon} title="Applications" />
          <NavItem icon={CheckCircleIcon} title="Approved" />
          <NavItem icon={XCircleIcon} title="Rejected" />
          <NavItem icon={CashIcon} title="Payments" /> */}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm lg:static">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex items-center lg:hidden">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <MenuAlt2Icon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
                <button className="ml-4 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <BellIcon className="h-6 w-6" />
                </button>
                <div className="ml-4 relative flex-shrink-0">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            
            {/* Summary Cards */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {summaryData.map((item) => (
                <SummaryCard key={item.title} {...item} />
              ))}
            </div>

            {/* Charts */}
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Applications Over Time
                  </h3>
                  {/* Add your chart component here */}
                  <div className="mt-4 h-48 bg-gray-200 rounded flex items-center justify-center">
                    Chart Placeholder
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Application Status Distribution
                  </h3>
                  {/* Add your chart component here */}
                  <div className="mt-4 h-48 bg-gray-200 rounded flex items-center justify-center">
                    Chart Placeholder
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Applications Table */}
            <div className="mt-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Recent Applications
                  </h3>
                </div>
                <div className="flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                      <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Property
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {recentApplications.map((application) => (
                              <tr key={application.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.property}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    application.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                    application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {application.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// const NavItem = ({ icon: Icon, title, active = false }) => (
  
//     href="#"
//     className={`flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
//       active
//         ? 'bg-gray-100 border-indigo-500 text-indigo-500'
//         : 'border-transparent hover:bg-gray-100 hover:border-indigo-500'
//     }`}
//   >
//     <Icon className="h-5 w-5" />
//     <span className="mx-4">{title}</span>
//   </a>
// );

const SummaryCard = () => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
       
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">Hello</dt>
            <dd className="text-2xl font-semibold text-gray-900">Hollo</dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;