"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
interface Template {
  id: number;
  name: string;
  
}

const TemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3001/api/v1/agents/templates');
          const data: Template[] = response.data;
          setTemplates(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching templates:', error);
          setError('Failed to fetch templates. Please try again later.');
          setLoading(false);
        }
      };
  

    fetchTemplates();
  }, []);

  const generateLink = async (templateId: number) => {
    try {
      const response = await fetch(`/api/generate-link/${templateId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to generate link');
      }
      const { link } = await response.json();
      // Handle generated link, for example redirect to the link
      window.location.href = link;
    } catch (error) {
      console.error('Error generating link:', error);
      // Handle error
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
    <h1 className="text-3xl font-bold mb-6">Available Templates</h1>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map(template => (
        <div key={template.id} className="p-4 bg-white shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{template.name}</h2>
          <div className="mb-4">
            {template.fields.map((field, index) => (
              <div key={index} className="mb-2">
                <label className="block text-sm font-medium text-gray-700">{field.name}</label>
                <input
                  type={field.type}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  readOnly
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => generateLink(template.id)}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Generate Link
          </button>
        </div>
      ))}
    </div>
  </div>
  );
};

export default TemplatesPage;
