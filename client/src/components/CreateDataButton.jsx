// src/components/CreateDataButton.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateDataButton = ({ onRefreshTable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', age: '' });
  const [error, setError] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', age: '' });
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateData = async () => {
    const { name, age } = formData;

    if (!name || !age) {
      setError('Both fields are required.');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_ROUTE}/data`, { name, age }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      alert('Data created successfully!');
      onRefreshTable(); 
      handleCloseModal();
    } catch (error) {
      console.error('Error creating data:', error);
      setError('Failed to create data. Please try again.');
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition-all"
      >
        Create New Data
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create New Data</h2>
            {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm font-medium mb-1">
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
                />
              </div>
              <button
                type="button"
                onClick={handleCreateData}
                className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-300 transition-all w-full"
              >
                Create Data
              </button>
            </form>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 mt-4 hover:text-gray-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateDataButton;

