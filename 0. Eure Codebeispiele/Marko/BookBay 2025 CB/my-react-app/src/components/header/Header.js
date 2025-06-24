import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Container, Box, Typography, IconButton, 
         Avatar, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/BookLogo.png';
import './Header.css';

const Header = ({ user, setUser }) => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const navigate = useNavigate();

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Kalender', path: '/dashboard' }
  ];

  const userMenuItems = [
    { label: 'Profil', path: '/profile' },
    { label: 'Buchungen', path: '/dashboard' },
    { label: 'Logout', action: () => handleLogout() }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleMobileMenuClose = () => setMobileMenuAnchor(null);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  return (
    <AppBar position="static" className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Logo */}
          <Box className="header-logo">
            <img src={logo} alt="BookBay Logo" className="logo-img" />
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              className="logo-text"
            >
              BookBay
            </Typography>
          </Box>

          {/* Mobile Menu Button */}
          <Box className="mobile-menu">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Desktop Navigation */}
          <Box className="desktop-nav">
            {pages.map(({ name, path }) => (
              <Button
                key={name}
                component={Link}
                to={path}
                className="nav-button"
              >
                {name}
              </Button>
            ))}
          </Box>

          {/* User Section */}
          <Box className="user-section">
            {user ? (
              <>
                <Tooltip title="Benutzeroptionen">
                  <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
                    <Avatar className="user-avatar">
                      {user.name?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Button 
                component={Link} 
                to="/login" 
                className="login-button"
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Menu */}
      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={handleMobileMenuClose}
        className="mobile-menu-list"
      >
        {pages.map(({ name, path }) => (
          <MenuItem 
            key={name} 
            component={Link} 
            to={path}
            onClick={handleMobileMenuClose}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>

      {/* User Menu */}
      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleUserMenuClose}
        className="user-menu-list"
      >
        {userMenuItems.map((item) => (
          <MenuItem
            key={item.label}
            onClick={() => {
              handleUserMenuClose();
              item.action?.();
            }}
            component={item.path ? Link : 'div'}
            to={item.path}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Header;