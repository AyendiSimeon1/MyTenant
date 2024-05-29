"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dashboard from '../components/dashboard/dashboard';
import { UserProvider } from '../../userContext';

const DashboardPage: any = () => {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     
        <Dashboard />
      
      
    </div>
  );
};

export default DashboardPage;
