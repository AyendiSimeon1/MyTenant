"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProperty from '../../components/dashboard/properties/addProperty';
import { UserProvider } from '../../../userContext';

const AddPropertyPage: any = () => {
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
     
        <AddProperty />
      
      
    </div>
  );
};

export default AddPropertyPage;
