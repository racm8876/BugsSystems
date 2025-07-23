import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  FolderOpen, 
  Bug, 
  Users, 
  Building,
  BarChart3, 
  TrendingUp,
  Shield,
  Settings,
  LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/app/dashboard' },
    { icon: FolderOpen, label: 'Projects', path: '/app/projects' },
    { icon: Bug, label: 'Bugs', path: '/app/bugs' },
    { icon: Building, label: 'Teams', path: '/app/teams' },
    { icon: Users, label: 'Users', path: '/app/users', adminOnly: true },
    { icon: BarChart3, label: 'Reports', path: '/app/reports' },
    { icon: TrendingUp, label: 'Analytics', path: '/app/analytics' },
    { icon: Shield, label: 'Security', path: '/app/security' },
    { icon: Settings, label: 'Settings', path: '/app/settings' },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    !item.adminOnly || user?.role === 'admin'
  );

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="w-64 bg-white shadow-lg h-screen flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-xl font-bold text-gray-800">Bug Tracker</h1>
        <p className="text-sm text-gray-600 mt-1">Issue Management</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center overflow-hidden">
            {user?.avatar ? (
              <img 
                src={`${import.meta.env.VITE_API_URL?.replace('/api', '')}${user.avatar}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-medium">
                {user?.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{user?.name}</p>
            <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;