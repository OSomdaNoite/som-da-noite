import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <Outlet />
    </div>
  )
}

export default AdminLayout
