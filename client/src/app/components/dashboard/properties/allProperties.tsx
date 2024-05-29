"use client";
import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useUser } from '../../../../userContext'; 


interface Property {
  id: string;
  address: string;
  type: string;
  agency: {
    companyName: string;
    logo: string;
  } | null;
}

interface Template {
  id: number;
  name: string;
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
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    console.log('Agency from context:', agency);
    console.log('User from context:', user);
  }, [agency, user]);
  const agencyId = agency?.id;
  console.log('This is context idsdfg', agencyId);
 

  useEffect(() => {
    const fetchProperties = async () => {
      if (!agency) {
        setError('No agency selected');
        return;
      }
      
      console.log(user);
      const url:string = `http://127.0.0.1:3001/api/v1/agents/properties/${agencyId}`;
      const convert = url.toString();
      console.log('Thisisdfsadfas', convert);
      try {
        
        
        const response = await axios.get(`http://127.0.0.1:3001/api/v1/agents/properties/${agencyId}`);
        const fetchedProperties = response.data as Property[];
        setProperties(fetchedProperties);
        console.log("Fetched properties:", fetchedProperties);
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'propertyId') {
      const selectedProp = properties.find((prop) => prop.id === value);
      setSelectedProperty(selectedProp || null);
    }

    setEmailForm({ ...emailForm, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const link = `http://localhost:3000/forms/${emailForm.templateId}`;

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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Property:
            <select
              name="propertyId"
              value={emailForm.propertyId}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            >
              <option value="">Select a property</option>
              {properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.address} - {property.type} (Agency: {property.agency?.companyName || 'No Name'})
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Template:
            <select
              name="templateId"
              value={emailForm.templateId}
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              required
            >
              <option value="" disabled>Select a template</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </label>
        </div>
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

      <button onClick={logContextData}>Data</button>
    </div>
  );
};

export default Properties;