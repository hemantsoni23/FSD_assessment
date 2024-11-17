import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminDataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = Cookies.get('accessToken');
        const response = await axios.get(
          `${process.env.REACT_APP_API_ROUTE}/data/all`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: accessToken ? `Bearer ${accessToken}` : '',
            },
          }
        );
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isDeleteModalOpen, isEditModalOpen]);

  const handleDelete = (row) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    setIsEditModalOpen(true);
  };

  // Filter the data based on filter inputs
  const filteredData = data.filter(
    (entry) =>
      entry.name.toLowerCase().includes(filter.toLowerCase()) &&
      (!countryFilter || entry.country === countryFilter)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const filteredKeys = data.length > 0
    ? Object.keys(data[0]).filter((key) => key !== '_id' && key !== '__v')
    : [];

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      {/* Filters */}
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3"
        />
        <select
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3"
        >
          <option value="">All Countries</option>
          {[...new Set(data.map((entry) => entry.country))].map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Data Table */}
      <div className="overflow-x-auto">
        {filteredData.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                {filteredKeys.map((key) => (
                  <th key={key} className="px-4 py-2 border-b capitalize text-left">
                    {key}
                  </th>
                ))}
                <th className="px-4 py-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  {filteredKeys.map((key) => (
                    <td key={key} className="px-4 py-2 border-b text-left">
                      {row[key]}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-b text-left">
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(row)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-gray-500">No Data Available</div>
        )}
      </div>

      {isDeleteModalOpen && (
        <DeleteModal
          row={selectedRow}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
      {isEditModalOpen && (
        <EditModal
          row={selectedRow}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};


const DeleteModal = ({ row, onClose }) => {

  const handleDelete = async () => {
    try {
      const accessToken = Cookies.get('accessToken');
      await axios.delete(
        `${process.env.REACT_APP_API_ROUTE}/data/${row._id}`,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        }
      );
      onClose();
    } catch (err) {
      console.error('Error deleting data:', err);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p>Are you sure you want to delete this data?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const EditModal = ({ row, onClose }) => {
  const [formData, setFormData] = useState({
    name: row.name || '',
    age: row.age || '',
    country: row.country || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = Cookies.get('accessToken');
      await axios.put(
        `${process.env.REACT_APP_API_ROUTE}/data/${row._id}`, 
        formData, 
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        } 
      );
      onClose();
    } catch (err) {
      console.error('Error updating data:', err);
      setError('Failed to update data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Data</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {['name', 'age', 'country'].map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium capitalize">{key}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="mr-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDataTable;
