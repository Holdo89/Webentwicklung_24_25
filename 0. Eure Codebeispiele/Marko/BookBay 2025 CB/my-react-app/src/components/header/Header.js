import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/BookLogo.png";

const pages = [
  { name: "Home", path: "/" },
  { name: "Kalender", path: "/dashboard" },
];

const settings = ["Profil", "Buchungen", "Logout"];

function Header({ user, setUser }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate();

  // Öffnen der mobilen Navigation
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  // Öffnen des Benutzer-Menüs
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  // Schließen mobiler Navigation
  const handleCloseNavMenu = () => setAnchorElNav(null);
  // Schließen Benutzer-Menü
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Logout-Handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    handleCloseUserMenu();
    window.location.reload();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#6EB5C0", color: "#E2E8E4" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo & Titel für Desktop */}
          <Box
            component="img"
            src={logo}
            alt="BookBay Logo"
            sx={{ height: 100, mr: 1, display: { xs: "none", md: "flex" } }}
          />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BookBay
          </Typography>

          {/* Mobile Menü Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map(({ name, path }) => (
                <MenuItem
                  key={name}
                  component={Link}
                  to={path}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo für Mobile */}
          <Box
            component="img"
            src={logo}
            alt="BookBay Logo"
            sx={{ height: 100, mr: 1, display: { xs: "flex", md: "none" } }}
          />

          {/* Navigation Buttons Desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(({ name, path }) => (
              <Button
                key={name}
                component={Link}
                to={path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {name}
              </Button>
            ))}
          </Box>

          {/* Benutzerbereich */}
          <Box sx={{ flexGrow: 0 }}>
            {!user ? (
              <Button
                variant="outlined"
                component={Link}
                to="/login"
                sx={{ color: "white", borderColor: "white", textTransform: "none" }}
              >
                Login
              </Button>
            ) : (
              <>
                <Tooltip title="Benutzeroptionen">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.name}>
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => {
                    if (setting === "Logout") {
                      return (
                        <MenuItem key={setting} onClick={handleLogout}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      );
                    }

                    const path =
                      setting === "Profil"
                        ? "/profile"
                        : setting === "Buchungen"
                        ? "/dashboard"
                        : "/";

                    return (
                      <MenuItem
                        key={setting}
                        component={Link}
                        to={path}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
