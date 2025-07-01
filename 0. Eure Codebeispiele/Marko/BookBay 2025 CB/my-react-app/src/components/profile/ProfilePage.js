import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography
} from '@mui/material';
import Login from '../authPage/login/Login';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isDataDialogOpen, setIsDataDialogOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  });
  const [profileData, setProfileData] = useState({
    title: '',
    name: '',
    last_name:'',
    email: ''
  });

const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user data", error);
    return null;
  }
};

// Verwendung:
const user = getUser();
if (!user) {
  return <Login onLoginSuccess={() => navigate('/profile')} />;
}

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      enqueueSnackbar('Passwörter stimmen nicht überein', { variant: 'error', autoHideDuration: 3000 });
      return;
    }

    try {
      await axios.post('http://localhost:3001/change-password', {
        email: user.email,
        oldPassword: passwords.old,
        newPassword: passwords.new
      });

      enqueueSnackbar('Passwort erfolgreich geändert', { variant: 'success', autoHideDuration: 3000,});
      handlePasswordDialogClose();
    } catch (error) {
      const message = error.response?.data?.message || 'Fehler beim Ändern des Passworts';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const handleProfileUpdate = async () => {
    try {
      await axios.post('http://localhost:3001/update-profile', {
        oldEmail: user.email,
        title: profileData.title,
        name: profileData.name,
        last_name: profileData.last_name,
        email: profileData.email
      });

      enqueueSnackbar('Profil erfolgreich aktualisiert', { variant: 'success', autoHideDuration: 3000, });
      handleDataDialogClose();
      // Lokalen User aktualisieren (optional)
      localStorage.setItem('user', JSON.stringify({
        ...user,
        title: profileData.title,
        name: profileData.name,
        email: profileData.email
      }));
      window.location.reload();
    } catch (error) {
      const message = error.response?.data?.message || 'Fehler beim Aktualisieren des Profils';
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 3000, });
    }
  };

  const handlePasswordDialogClose = () => {
    setIsPasswordDialogOpen(false);
    setPasswords({ old: '', new: '', confirm: '' });
  };

  const handleDataDialogClose = () => {
    setIsDataDialogOpen(false);
    setProfileData({ title: user.title, name: user.name, email: user.email });
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-page">
      <Typography variant="h4">Dein Profil</Typography>

      <div className="profile-info">
        <Typography><strong>Anrede:</strong> {user.title}</Typography>
        <Typography><strong>Name:</strong> {user.name} {user.last_name}</Typography>
        <Typography><strong>E-Mail:</strong> {user.email}</Typography>
      </div>

      <div className="button-group">
        <Button 
          variant="outlined" 
          onClick={() => setIsPasswordDialogOpen(true)}
        >
          Passwort ändern
        </Button>
        <Button 
          variant="outlined" 
          onClick={() => {
            setProfileData({
              title: user.title,
              name: user.name,
              last_name: user.last_name,
              email: user.email
            });
            setIsDataDialogOpen(true);
          }}
        >
          Daten ändern
        </Button>
      </div>

      {/* Passwort-Dialog */}
      <Dialog open={isPasswordDialogOpen} onClose={handlePasswordDialogClose}>
        <DialogTitle>Passwort ändern</DialogTitle>
        <DialogContent>
          <TextField
            name="old"
            label="Altes Passwort"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.old}
            onChange={handlePasswordInputChange}
          />
          <TextField
            name="new"
            label="Neues Passwort"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.new}
            onChange={handlePasswordInputChange}
          />
          <TextField
            name="confirm"
            label="Passwort bestätigen"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.confirm}
            onChange={handlePasswordInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePasswordDialogClose}>Abbrechen</Button>
          <Button onClick={handlePasswordChange} color="primary" variant="contained">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>

      {/* Daten-Dialog */}
      <Dialog open={isDataDialogOpen} onClose={handleDataDialogClose}>
        <DialogTitle>Profil bearbeiten</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Anrede"
            fullWidth
            margin="normal"
            value={profileData.title}
            onChange={handleProfileInputChange}
          />
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={profileData.name}
            onChange={handleProfileInputChange}
          />
           <TextField
            name="last_name"
            label="Nachname"
            fullWidth
            margin="normal"
            value={profileData.last_name}
            onChange={handleProfileInputChange}
          />
          
          <TextField
            name="email"
            label="E-Mail"
            fullWidth
            margin="normal"
            value={profileData.email}
            onChange={handleProfileInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDataDialogClose}>Abbrechen</Button>
          <Button onClick={handleProfileUpdate} color="primary" variant="contained">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
