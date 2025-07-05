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
import logo from '../../assets/BookLogo.png';
import './Header.css';

const Header = ({ user, setUser }) => {
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { name: 'Home', path: '/' },
    { name: 'Kalender', path: '/dashboard' }
  ];

  const userMenuItems = [
    { label: 'Profil', path: '/profile' },
    { label: 'Buchungen', path: '/dashboard' },
    { label: 'Logout', action: () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/');
      }
    }
  ];

  return (
    <AppBar position="sticky" elevation={0} className="header">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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

          <Box className="desktop-nav">
            {pages.map(({ name, path }) => (
              <Button
                key={name}
                component={Link}
                to={path}
                className={`nav-button${location.pathname === path ? ' active' : ''}`}
              >
                {name}
              </Button>
            ))}
          </Box>

          <Box className="user-section">
            {user ? (
              <Tooltip title="Benutzeroptionen">
                <IconButton onClick={(e) => setUserMenuAnchor(e.currentTarget)}>
                  <Avatar className="user-avatar">
                    {user.name?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>
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

      <Menu
        anchorEl={mobileMenuAnchor}
        open={Boolean(mobileMenuAnchor)}
        onClose={() => setMobileMenuAnchor(null)}
        className="mobile-menu-list"
      >
        {pages.map(({ name, path }) => (
          <MenuItem
            key={name}
            component={Link}
            to={path}
            onClick={() => setMobileMenuAnchor(null)}
          >
            {name}
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={() => setUserMenuAnchor(null)}
        className="user-menu-list"
      >
        {userMenuItems.map((item) => (
          <MenuItem
            key={item.label}
            component={item.path ? Link : 'div'}
            to={item.path}
            onClick={() => {
              setUserMenuAnchor(null);
              item.action?.();
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Header;
