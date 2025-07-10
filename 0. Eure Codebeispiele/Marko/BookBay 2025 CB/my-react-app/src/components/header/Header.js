import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  IconButton,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/BookLogoCut.png';
import './Header.css';

/**
 * Header-Komponente:
 * Responsives Navigationsmenü mit Nutzer-Avatar und Mobile-Drawer.
 *
 * @param {{ name?: string } | null} user - Aktuell angemeldeter Nutzer oder null.
 * @param {function} setUser - Funktion zum Setzen des Nutzer-Status.
 * @returns {JSX.Element}
 */
export default function Header({ user, setUser }) {
  const [mobileAnchor, setMobileAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /** Seitenlinks für die Hauptnavigation */
  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Kalender', path: '/dashboard' }
  ];

  /** Einträge im Nutzer-Dropdown-Menü */
  const userItems = [
    { label: 'Profil', path: '/profile' },
    { label: 'Buchungen', path: '/dashboard' },
    {
      label: 'Logout',
      action: () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
      }
    }
  ];

  /**
   * Schließt alle geöffneten Menüs.
   * @function
   */
  const closeMenus = () => {
    setMobileAnchor(null);
    setUserAnchor(null);
  };

  return (
    <AppBar position="sticky" elevation={0} className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo und Titel */}
          <Box className="header-logo">
            <img src={logo} alt="BookBay Logo" className="logo-img" />
            <Typography component={Link} to="/" variant="h6" className="logo-text">
              BookBay
            </Typography>
          </Box>

          {/* Desktop-Navigation */}
          <Box className="desktop-nav">
            {pages.map(({ name, path }) => (
              <Button
                key={name}
                component={Link}
                to={path}
                className={`nav-button${pathname === path ? ' active' : ''}`}
              >
                {name}
              </Button>
            ))}
          </Box>

          {/* Mobile-Menü-Icon */}
          <Box className="mobile-menu">
            <IconButton onClick={e => setMobileAnchor(e.currentTarget)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* User-Bereich */}
          <Box className="user-section">
            {user ? (
              <Tooltip title="Benutzeroptionen">
                <IconButton onClick={e => setUserAnchor(e.currentTarget)}>
                  <Avatar className="user-avatar">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Button component={Link} to="/login" className="login-button">
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile-Menü */}
      <Menu
        anchorEl={mobileAnchor}
        open={Boolean(mobileAnchor)}
        onClose={closeMenus}
        className="mobile-menu-list"
      >
        {pages.map(({ name, path }) => (
          <MenuItem key={name} component={Link} to={path} onClick={closeMenus}>
            {name}
          </MenuItem>
        ))}
      </Menu>

      {/* Nutzer-Dropdown */}
      <Menu
        anchorEl={userAnchor}
        open={Boolean(userAnchor)}
        onClose={closeMenus}
        className="user-menu-list"
      >
        {userItems.map(({ label, path, action }) => (
          <MenuItem
            key={label}
            component={path ? Link : 'div'}
            to={path}
            onClick={() => {
              closeMenus();
              action?.();
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}
