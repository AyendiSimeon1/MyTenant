// pages/index.js
import { useState, useEffect } from 'react';
import TemplateForm from '../components/TemplateForm';
import CustomForm from '../components/CustomForm';

const HomePage = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCustomForm, setShowCustomForm] = useState(false);

  useEffect(() => {
    const fetchTemplates = async () => {
      const response = await fetch('/api/templates');
      const data = await response.json();
      setTemplates(data);
    };

    fetchTemplates();
  }, []);

  const handleTemplateSubmit = async (formData) => {
    // Handle template form submission
    console.log('Template Form Submitted:', formData);
  };

  const handleCustomSubmit = async (formData) => {
    const response = await fetch('/api/submit-custom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log('Custom Form Submitted:', data);
  };

  return (
    <div>
      <h1>Choose a Form Template or Create Your Own</h1>
      <div>
        <button onClick={() => setShowCustomForm(false)}>Choose Template</button>
        <button onClick={() => setShowCustomForm(true)}>Create Custom Form</button>
      </div>

      {showCustomForm ? (
        <CustomForm onSubmit={handleCustomSubmit} />
      ) : (
        <div>
          <h2>Select a Template</h2>
          <ul>
            {templates.map((template) => (
              <li key={template.id} onClick={() => setSelectedTemplate(template)}>
                {template.name}
              </li>
            ))}
          </ul>
          {selectedTemplate && <TemplateForm template={selectedTemplate} onSubmit={handleTemplateSubmit} />}
        </div>
      )}
    </div>
  );
};

export default HomePage;
