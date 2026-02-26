import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>
          ✈️ FlightSearch
        </Link>
      </div>
      <div style={styles.links}>
        {user ? (
          <>
            <span style={styles.greeting}>Hello, {user.name || user.email}</span>
            <Link to="/" style={styles.link}>
              Search Flights
            </Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a73e8',
    padding: '0.75rem 2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  brand: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
  },
  brandLink: {
    color: '#ffffff',
    textDecoration: 'none',
    letterSpacing: '0.5px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.25rem',
  },
  greeting: {
    color: '#e8f0fe',
    fontSize: '0.95rem',
  },
  link: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: '500',
    padding: '0.4rem 0.75rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s ease',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    border: '1px solid #ffffff',
    padding: '0.4rem 0.85rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease, color 0.2s ease',
  },
};

export default NavBar;