import React, { useState } from 'react';

const ManageUser = ({ users, onUpdateUser, onDeleteUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    onUpdateUser(selectedUser);
    setIsEditModalOpen(false);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDeleteUser(selectedUser);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow-lg">
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Role</th>
            <th className="px-4 py-2 border">Country</th>
            <th className="px-4 py-2 border">Update</th>
            <th className="px-4 py-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">{user.role}</td>
              <td className="px-4 py-2 border">
                {user.role === 'viewer' ? 'Assigned: ' : ''}
                {user.country}
              </td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleEdit(user)}
                >
                  Update
                </button>
              </td>
              <td className="px-4 py-2 border">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(user)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Update User Details</h2>
            <form>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Role</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Country</label>
                <input
                  type="text"
                  value={selectedUser.country}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, country: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Delete User</h2>
            <p>Are you sure you want to delete {selectedUser.email}?</p>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUser;
