"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useUser } from '../../../../userContext'; 
import Image from 'next/image'; // Importing Image from next/image
import defaultImage from '/public/mytenant-logo.jpg'; // Importing default image

interface Property {
  id: string;
  address: string;
  type: string;
  agency: {
    companyName: string;
    logo: string;
  } | null;
  image: string; // Assuming an image URL is available for the property
}

interface Template {
  id: number;
  name: string;
  thumbnail: string; // Assuming a thumbnail URL is available for the template
}

interface EmailForm {
  email: string;
  templateId: number;
  propertyId: string;
}

const Properties = () => {
  const { agency, user, logContextData } = useUser();
  const [properties, setProperties] = useState<Property[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [emailForm, setEmailForm] = useState<EmailForm>({ email: '', templateId: 0, propertyId: '' });
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Agency from context:', agency);
    console.log('User from context:', user);
  }, [agency, user]);

  const agencyId = agency?.id;

  useEffect(() => {
    const fetchProperties = async () => {
      if (!agency) {
        setError('No agency selected');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/v1/agents/properties/${agencyId}`);
        const fetchedProperties = response.data as Property[];
        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setError('Failed to fetch properties. Please try again later.');
      }
    };

    fetchProperties();
  }, [agencyId]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/api/v1/agents/templates`);
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setError('Failed to fetch templates. Please try again later.');
      }
    };

    fetchTemplates();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailForm({ ...emailForm, [name]: value });
  };

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    setEmailForm({ ...emailForm, propertyId: property.id });
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setEmailForm({ ...emailForm, templateId: template.id });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const link = `http://localhost:3000/forms?templateId=${emailForm.templateId}&propertyId=${emailForm.propertyId}&agencyId=${agencyId}`;

    try {
      await axios.post(`http://127.0.0.1:3001/api/v1/agents/send-email`, {
        email: emailForm.email,
        link: link,
        agencyId: agencyId,
        property: selectedProperty,
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Properties</h1>
      {error && <p className="text-red-500">{error}</p>}
      <h2 className="text-2xl font-bold mb-4">Send Email to Tenants</h2>
      
      <div>
        <h3 className="text-xl font-bold mb-2">Select Property</h3>
        <div className="grid grid-cols-3 gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className={`p-4 border rounded-md cursor-pointer ${emailForm.propertyId === property.id ? 'border-indigo-500' : ''}`}
              onClick={() => handlePropertySelect(property)}
            >
              <Image 
                src={property.image || defaultImage} 
                alt={property.address} 
                width={300} 
                height={200} 
                className="w-full h-32 object-cover mb-2 rounded-md"
              />
              <div className="text-center">
                <p className="font-semibold">{property.address}</p>
                <p className="text-sm text-gray-600">{property.type}</p>
                <p className="text-xs text-gray-500">Agency: {property.agency?.companyName || 'No Name'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-2 mt-4">Select Template</h3>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`p-4 border rounded-md cursor-pointer ${emailForm.templateId === template.id ? 'border-indigo-500' : ''}`}
              onClick={() => handleTemplateSelect(template)}
            >
              <Image 
                src={template.thumbnail || defaultImage} 
                alt={template.name} 
                width={300} 
                height={200} 
                className="w-full h-32 object-cover mb-2 rounded-md"
              />
              <div className="text-center">
                <p className="font-semibold">{template.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tenant Email:
            <input
              type="email"
              name="email"
              value={emailForm.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Send Email
        </button>
      </form>
      <p className="text-gray-500 text-lg">
            <a href="/dashboard" className="text-orange-500 hover:underline">Go to dashboard</a>
          </p>
      <button onClick={logContextData} className="mt-4 bg-gray-200 py-2 px-4 rounded-md">Log Context Data</button>
    </div>
  );
};

export default Properties;
