import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataTable = ({ refreshTable }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ROUTE}/data`,
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const result = await response.data;
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refreshTable]);

  // Apply filters
  const filteredData = data.filter((entry) =>
    entry.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        {/* Filter Input */}
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-full sm:w-1/3"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border border-gray-300">Name</th>
              <th className="p-3 text-left border border-gray-300">Age</th>
              <th className="p-3 text-left border border-gray-300">Country</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((entry, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 border border-gray-300">{entry.name}</td>
                  <td className="p-3 border border-gray-300">{entry.age}</td>
                  <td className="p-3 border border-gray-300">{entry.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-3 border border-gray-300"
                >
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
