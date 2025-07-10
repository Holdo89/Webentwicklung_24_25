// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import Login from '../authPage/login/Login';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography
} from '@mui/material';
import './ProfilePage.css';

/**
 * Zeigt das Benutzerprofil und ermöglicht
 * Passwort- und Datenänderung.
 */
export default function ProfilePage() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Steuerung der Dialoge
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDataDialog, setShowDataDialog]       = useState(false);

  // Formularzustände
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [profileData, setProfileData] = useState({ title: '', name: '', last_name: '', email: '' });

  // Aktuellen Nutzer aus LocalStorage holen
  const user = React.useMemo(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }, []);

  // Umleitung zur Login-Seite, falls nicht eingeloggt
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  // Passwort ändern
  const changePassword = async () => {
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
      enqueueSnackbar('Passwort geändert', { variant: 'success' });
      closePasswordDialog();
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || 'Fehler beim Ändern des Passworts', { variant: 'error' });
    }
  };

  // Profildaten aktualisieren
  const updateProfile = async () => {
    try {
      await axios.post('http://localhost:3001/update-profile', {
        oldEmail: user.email,
        ...profileData
      });
      enqueueSnackbar('Profil aktualisiert', { variant: 'success' });
      localStorage.setItem('user', JSON.stringify({ ...user, ...profileData }));
      closeDataDialog();
      window.location.reload();
    } catch (err) {
      enqueueSnackbar(err.response?.data?.message || 'Fehler beim Aktualisieren des Profils', { variant: 'error' });
    }
  };

  // Dialog schließen und Zustand zurücksetzen
  const closePasswordDialog = () => {
    setShowPasswordDialog(false);
    setPasswords({ old: '', new: '', confirm: '' });
  };
  const closeDataDialog = () => {
    setShowDataDialog(false);
    setProfileData({ title: user.title, name: user.name, last_name: user.last_name, email: user.email });
  };

  // Formular-Input handler
  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };
  const handleProfileChange = e => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) return <Login onLoginSuccess={() => navigate('/profile')} />;

  return (
    <div className="profile-page">
      <Typography variant="h4">Dein Profil</Typography>

      <div className="profile-info">
        <Typography><strong>Anrede:</strong> {user.title}</Typography>
        <Typography><strong>Name:</strong> {user.name} {user.last_name}</Typography>
        <Typography><strong>E-Mail:</strong> {user.email}</Typography>
      </div>

      <div className="button-group">
        <Button variant="outlined" onClick={() => setShowPasswordDialog(true)}>
          Passwort ändern
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setProfileData({ title: user.title, name: user.name, last_name: user.last_name, email: user.email });
            setShowDataDialog(true);
          }}
        >
          Daten ändern
        </Button>
      </div>

      {/* Passwort-Dialog */}
      <Dialog open={showPasswordDialog} onClose={closePasswordDialog}>
        <DialogTitle>Passwort ändern</DialogTitle>
        <DialogContent>
          <TextField name="old"     label="Altes Passwort"        type="password" fullWidth margin="normal" value={passwords.old}     onChange={handlePasswordChange} />
          <TextField name="new"     label="Neues Passwort"        type="password" fullWidth margin="normal" value={passwords.new}     onChange={handlePasswordChange} />
          <TextField name="confirm" label="Passwort bestätigen"   type="password" fullWidth margin="normal" value={passwords.confirm} onChange={handlePasswordChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePasswordDialog}>Abbrechen</Button>
          <Button onClick={changePassword} variant="contained" color="primary">Speichern</Button>
        </DialogActions>
      </Dialog>

      {/* Daten-Dialog */}
      <Dialog open={showDataDialog} onClose={closeDataDialog}>
        <DialogTitle>Profil bearbeiten</DialogTitle>
        <DialogContent>
          <TextField name="title"     label="Anrede"      fullWidth margin="normal" value={profileData.title}     onChange={handleProfileChange} />
          <TextField name="name"      label="Name"        fullWidth margin="normal" value={profileData.name}      onChange={handleProfileChange} />
          <TextField name="last_name" label="Nachname"    fullWidth margin="normal" value={profileData.last_name} onChange={handleProfileChange} />
          <TextField name="email"     label="E-Mail"      fullWidth margin="normal" value={profileData.email}     onChange={handleProfileChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDataDialog}>Abbrechen</Button>
          <Button onClick={updateProfile} variant="contained" color="primary">Speichern</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
