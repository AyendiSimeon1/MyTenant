import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { someFormAction } from '../redux/actions'; // Import your form action

const Form = ({ initialValues, onSubmit, fields }) => {
  const [formData, setFormData] = useState(initialValues || {});
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(someFormAction(formData)); // Dispatch action with form data
    if (onSubmit) onSubmit(formData); // Call additional onSubmit handler
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <label key={field.name}>
          {field.label}
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
          />
        </label>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;