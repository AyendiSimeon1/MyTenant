"use client";
import React from 'react';
import Modal from 'react-modal';

interface MyModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedForm: {
    data: Record<string, any>;
  };
  handleApprove: (form: { data: Record<string, any> }) => void;
  handleReject: (form: { data: Record<string, any> }) => void;
}

const MyModal: React.FC<MyModalProps> = ({ isOpen, onRequestClose, selectedForm, handleApprove, handleReject }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      ariaHideApp={false} // This is needed to prevent accessibility issues
    >
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Form Details</h2>
        <div className="mb-4">
          {Object.entries(selectedForm.data).map(([key, value]) => (
            <div key={key} className="mb-2">
              <strong>{key}:</strong> {value}
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => handleApprove(selectedForm)}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600 focus:outline-none focus:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => handleReject(selectedForm)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:bg-red-600"
          >
            Reject
          </button>
          <button
            onClick={onRequestClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded ml-2 hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MyModal;
