
import { Outlet } from 'react-router-dom';
import Sidebar from './common/Sidebar';

const DashboardLayout = () => {
  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <div className='fixed inset-0 z-0'>
        <div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
        <div className='absolute inset-0 backdrop-blur-sm' />
      </div>

      <Sidebar />
      <div className="flex-1 relative z-10 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;