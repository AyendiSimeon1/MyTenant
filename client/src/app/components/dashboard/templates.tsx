"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface Field {
  name: string;
  type: string;
}

interface Template {
  fields: Field[];
}

interface TemplateFormProps {
  template: Template;
  onSubmit: (formData: { [key: string]: string }) => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({ template, onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(() => {
    const initialData: { [key: string]: string } = {};
    template.fields.forEach(field => {
      initialData[field.name] = '';
    });
    return initialData;
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const response = await axios.post('/api/submit', formData);
      
        // Axios does not have `ok` property, you can check the status code instead
        if (response.status !== 200) {
          throw new Error(`Error: ${response.statusText}`);
        }
      
    
        const result = response.data;
        onSubmit(result);
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      {template.fields.map((field, index) => (
        <div key={index}>
          <label>{field.name}</label>
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
          />
        </div>
      ))}
      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default TemplateForm;

