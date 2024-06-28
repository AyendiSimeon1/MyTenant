import React from 'react';

interface FormSubmission {
  id: string;
  companyName: string;
  templateName: string;
  status: string;
}

interface FormSubmissionTableProps {
  formSubmissions: FormSubmission[];
}

const FormSubmissionTable: React.FC<FormSubmissionTableProps> = ({ formSubmissions }) => {
  return (
    <div id="form-submissions" className="py-4">
      <h2 className="text-2xl font-semibold mb-4">Form Submissions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/4 py-2">Agency ID</th>
              <th className="w-1/4 py-2">Template ID</th>
              <th className="w-1/4 py-2">Status</th>
              <th className="w-1/4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {formSubmissions.map((submission) => (
              <tr key={submission.id}>
                <td className="w-1/4 py-2 px-4">{submission.id}</td>
                <td className="w-1/4 py-2 px-4">{submission.id}</td>
                <td className="w-1/4 py-2 px-4">{submission.status}</td>
                <td className="w-1/4 py-2 px-4">
                  <button className="bg-blue-500 text-white px-4 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormSubmissionTable;
