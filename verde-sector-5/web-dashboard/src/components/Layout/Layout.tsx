import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  Map, 
  Trees, 
  FileText, 
  Megaphone, 
  Landmark, 
  BarChart3, 
  Users, 
  Menu, 
  Bell, 
  User, 
  X
} from 'lucide-react';
import './Layout.css';

// Using dummy roles for now, usually coming from context/auth store
const userRole = 'admin';

const navItems = [
  { path: '/harta', label: 'Hartă', icon: Map },
  { path: '/copaci', label: 'Copaci', icon: Trees },
  { path: '/rapoarte', label: 'Rapoarte', icon: FileText },
  { path: '/campanii', label: 'Campanii', icon: Megaphone },
  { path: '/spatii-verzi', label: 'Spații Verzi', icon: Landmark },
];

const adminItems = [
  { path: '/analitice', label: 'Analitice', icon: BarChart3 },
  { path: '/utilizatori', label: 'Utilizatori', icon: Users },
];

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const allNavItems = userRole === 'admin' ? [...navItems, ...adminItems] : navItems;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="layout-container">
      {/* Sidebar Desktop & Mobile Overlay */}
      <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <Trees className="logo-icon" size={28} />
            <h1 className="logo-text">Verde <span>S5</span></h1>
          </div>
          <button className="mobile-close-btn" onClick={closeMobileMenu}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path} className="nav-item">
                  <NavLink 
                    to={item.path} 
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="page-title">
              {allNavItems.find(item => item.path === location.pathname)?.label || 'Tablou de Comandă'}
            </h2>
          </div>
          
          <div className="header-right">
            <button className="header-icon-btn" aria-label="Notificări">
              <Bell size={20} />
              <span className="notification-dot"></span>
            </button>
            <div className="user-profile">
              <div className="avatar">
                <User size={20} />
              </div>
              <span className="user-name">Admin</span>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation (< 768px fallback if you want actual bottom bar) */}
      <nav className="bottom-nav">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path}
              to={item.path} 
              className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span className="bottom-nav-label">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};
