import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface ReferenceFormProps {
  formSubmissionId: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  contactInfo: string;
  relationship: string;
  additionalDetails: string;
  identityDocument: string;
}

const ReferenceForm: React.FC<ReferenceFormProps> = ({ formSubmissionId }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    contactInfo: '',
    relationship: '',
    additionalDetails: '',
    identityDocument: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/references', {
        formSubmissionId,
        ...formData,
      });

      if (res.status === 201) {
        setFormData({
          name: '',
          phone: '',
          email: '',
          contactInfo: '',
          relationship: '',
          additionalDetails: '',
          identityDocument: '',
        });
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Failed to submit reference:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Submit a Reference</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {/* Other input fields */}
        <button type="submit" className={`btn ${loading ? 'btn-loading' : ''}`} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      {submitted && <p>Thank you for your submission!</p>}
    </div>
  );
};

export default ReferenceForm;
