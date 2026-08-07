import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  Map,
  Trees,
  FileText,
  Megaphone,
  LayoutDashboard,
  Award,
  UsersRound,
  Handshake,
  BarChart3,
  Users,
} from 'lucide-react';

// Using dummy roles for now, usually coming from context/auth store
const userRole = 'admin';

const navItems = [
  { path: '/', label: 'Tablou de Comandă', icon: LayoutDashboard },
  { path: '/map', label: 'Hartă', icon: Map },
  { path: '/reports', label: 'Rapoarte', icon: FileText },
  { path: '/campaigns', label: 'Campanii', icon: Megaphone },
  { path: '/trees', label: 'Copaci', icon: Trees },
  { path: '/rewards', label: 'Recompense', icon: Award },
  { path: '/community', label: 'Comunitate', icon: UsersRound },
  { path: '/sponsors', label: 'Sponsori', icon: Handshake },
];

const adminItems = [
  { path: '/analitice', label: 'Analitice', icon: BarChart3 },
  { path: '/utilizatori', label: 'Utilizatori', icon: Users },
];

export const Layout: React.FC = () => {
  const location = useLocation();

  const allNavItems = userRole === 'admin' ? [...navItems, ...adminItems] : navItems;

  const currentPageLabel = allNavItems.find(item => item.path === location.pathname)?.label || 'Tablou de Comandă';

  return (
    <div className="app-shell">
      {/* Desktop */}
      <aside className="app-sidebar hig-sidebar hig-material">
        <div className="app-sidebar-logo">Verde S5</div>
        {allNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `hig-sidebar-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={18} aria-hidden />
            {item.label}
          </NavLink>
        ))}
      </aside>

      <main className="app-content">
        {/* Mobile top bar */}
        <header className="app-mobile-navbar hig-navbar hig-material">
          <span />
          <span className="hig-navbar-title">{currentPageLabel}</span>
          <span />
        </header>
        <Outlet />
      </main>

      {/* Mobile bottom tab bar — the one glass surface in the shell */}
      <nav className="app-tabbar hig-glass">
        {navItems.slice(0, 5).map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `app-tabbar-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={22} aria-hidden />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
