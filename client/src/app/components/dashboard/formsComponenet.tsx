import { useEffect, useState } from 'react';
import axios from 'axios';

interface Property {
    id: number;
    address: string;
    type: string;
    createdAt: string;
    agencyId: string;
  }
  
interface Template {
    id: number;
    name: string;
    fields: any; // Adjust this type based on the structure of your template fields
    createdAt: string;
  }
  
interface Reference {
    id: string;
    name: string;
    phone: string;
    email: string;
    contactInfo: string;
    relationship: string;
    isConfirmed: boolean;
    additionalDetails: string;
    identityDocument: string;
    formSubmissionId: string;
  }
  
interface FormSubmission {
    id: string;
    agencyId: string;
    templateId: number;
    propertyId: number;
    data: any; // Adjust this type based on the structure of your form data
    status: string;
    createdAt: string;
    updatedAt: string;
    template: Template;
    property: Property;
    references: Reference[];
  }

  const FormsPage = () => {
    const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>([]);
    const agencyId = 'your-agency-id'; // Replace with actual agencyId source
  
    useEffect(() => {
      const fetchFormSubmissions = async () => {
        try {
          const response = await axios.get<FormSubmission[]>(`/api/forms/${agencyId}`);
          setFormSubmissions(response.data);
        } catch (error) {
          console.error('Error fetching form submissions:', error);
        }
      };
  
      fetchFormSubmissions();
    }, [agencyId]);
  
    const handleStatusChange = async (formSubmissionId: string, status: string) => {
      try {
        await axios.post('/api/forms/status', { formSubmissionId, status });
        setFormSubmissions(prev =>
          prev.map(submission =>
            submission.id === formSubmissionId ? { ...submission, status } : submission
          )
        );
      } catch (error) {
        console.error('Error updating form submission status:', error);
      }
    };
  
    return (
      <div>
        <h1>Form Submissions</h1>
        <ul>
          {formSubmissions.map(submission => (
            <li key={submission.id}>
              <p>{submission.property.address}</p>
              <p>{submission.template.name}</p>
              <p>Status: {submission.status}</p>
              <button onClick={() => handleStatusChange(submission.id, 'approved')}>Approve</button>
              <button onClick={() => handleStatusChange(submission.id, 'rejected')}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default FormsPage;