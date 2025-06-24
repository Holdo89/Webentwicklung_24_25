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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Login onLoginSuccess={() => navigate('/profile')} />;
  }

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      enqueueSnackbar('Passwörter stimmen nicht überein', { variant: 'error' });
      return;
    }

    try {
      await axios.post('http://localhost:3001/change-password', {
        email: user.email,
        oldPassword: passwords.old,
        newPassword: passwords.new
      });

      enqueueSnackbar('Passwort erfolgreich geändert', { variant: 'success' });
      handleDialogClose();
    } catch (error) {
      const message = error.response?.data?.message || 'Fehler beim Ändern des Passworts';
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setPasswords({ old: '', new: '', confirm: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-page">
      <Typography variant="h4">Dein Profil</Typography>

      <div className="profile-info">
        <Typography><strong>Name:</strong> {user.name}</Typography>
        <Typography><strong>E-Mail:</strong> {user.email}</Typography>
      </div>

      <Button 
        variant="outlined" 
        onClick={() => setIsDialogOpen(true)}
      >
        Passwort ändern
      </Button>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Passwort ändern</DialogTitle>
        <DialogContent>
          <TextField
            name="old"
            label="Altes Passwort"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.old}
            onChange={handleInputChange}
          />
          <TextField
            name="new"
            label="Neues Passwort"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.new}
            onChange={handleInputChange}
          />
          <TextField
            name="confirm"
            label="Passwort bestätigen"
            type="password"
            fullWidth
            margin="normal"
            value={passwords.confirm}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Abbrechen</Button>
          <Button onClick={handlePasswordChange} color="primary" variant="contained">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;