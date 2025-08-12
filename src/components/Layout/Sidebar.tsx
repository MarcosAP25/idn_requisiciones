import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  ChevronLeft,
  LogOut,
  User,
  UserRoundCog,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { menuItems as staticMenuItems, MenuItem } from '../../data/SiderbarData';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const { user, logout } = useAuth();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const allMenuItems: MenuItem[] = [
    ...staticMenuItems,
    ...(user?.role === 'admin' ? [{ separator: true }] : []),
    ...(user?.role === 'admin' ? [{ icon: UserRoundCog, label: 'Control de Acceso', path: '/users' }] : []),
  ];

  return (
    <div className={`bg-slate-900 text-white h-screen fixed left-0 top-0 z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white-600 rounded-lg flex items-center justify-center">
              <img src="/images/dni_logo.png" alt="DNI Logo" />
            </div>
            <div>
              <h2 className="font-bold text-sm">DNI</h2>
              <p className="text-xs text-slate-300">RECURSOS HUMANOS</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded hover:bg-slate-800 transition-colors"
          aria-label="Toggle sidebar"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="mt-6">
        {allMenuItems.map((item, index) => {
          // Si el item es un separador, renderiza una línea horizontal
          if (item.separator) {
            return (
              <hr key={index} className="my-4 border-t border-slate-700 mx-4" />
            );
          }
          // Si el item tiene sub-elementos, renderiza el dropdown
          if (item.children) {
            // Aseguramos que el ícono y la etiqueta existen antes de renderizarlos
            const IconComponent = item.icon;
            return (
              <div key={item.label}>
                <button
                  onClick={() => handleDropdownToggle(item.label!)}
                  className={`flex items-center px-4 py-3 text-sm w-full transition-colors hover:bg-slate-800 ${
                    openDropdown === item.label ? 'bg-slate-800' : ''
                  }`}
                >
                  {IconComponent && <IconComponent className="w-5 h-5" />}
                  {!isCollapsed && (
                    <>
                      <span className="ml-3">{item.label}</span>
                      <ChevronDown
                        className={`w-4 h-4 ml-auto transition-transform ${
                          openDropdown === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    </>
                  )}
                </button>
                {/* Contenido del dropdown */}
                {!isCollapsed && openDropdown === item.label && (
                  <div className="bg-slate-800">
                    {item.children.map((child) => {
                       const ChildIconComponent = child.icon;
                       return (
                          <NavLink
                            key={child.path}
                            to={child.path!}
                            className={({ isActive }) =>
                              `flex items-center px-8 py-3 text-sm transition-colors hover:bg-slate-700 ${
                                isActive ? 'bg-slate-700 border-r-2 border-blue-500' : ''
                              }`
                            }
                          >
                            {ChildIconComponent && <ChildIconComponent className="w-4 h-4" />}
                            <span className="ml-3">{child.label}</span>
                          </NavLink>
                       );
                    })}
                  </div>
                )}
              </div>
            );
          }
          // Si es un item regular
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path!}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm transition-colors hover:bg-slate-800 ${
                  isActive ? 'bg-slate-800 border-r-2 border-blue-500' : ''
                }`
              }
            >
              {IconComponent && <IconComponent className="w-5 h-5" />}
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-slate-300 truncate">{user?.email}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="p-2 rounded hover:bg-slate-800 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
