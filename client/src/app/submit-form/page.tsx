import SubmitForm from '../components/dashboard/properties/submitForm';
import React, { Suspense } from 'react';

const SubmitFormPage = () => {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <SubmitForm />
      </Suspense>
    );
  };
  
  export default SubmitFormPage;