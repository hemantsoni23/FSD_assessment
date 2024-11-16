import React from 'react'
import AdminDataTable from '../components/AdminDataTable'

const AdminPanel = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 mt-14">Manage Data</h1>
      <AdminDataTable />
    </div>
  )
}

export default AdminPanel