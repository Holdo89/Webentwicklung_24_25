import React, { useState } from "react";
import Login from "../authPage/login/Login";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import "./ProfilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Login onLoginSuccess={() => navigate("/profile")} />;
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Die neuen Passwörter stimmen nicht überein.", { variant: "error" });
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/change-password", {
        email: user.email,
        oldPassword,
        newPassword,
      });

      enqueueSnackbar("Passwort erfolgreich geändert!", { variant: "success" });
      setOpen(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      const errorMsg = error.response?.data || "Fehler beim Ändern des Passworts.";
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
  };

  return (
    <div className="profile-container">
      <Typography variant="h4" gutterBottom>
        Dein Profil
      </Typography>

      <Typography className="profile-item"><strong>Name:</strong> {user.name}</Typography>
      <Typography className="profile-item"><strong>E-Mail:</strong> {user.email}</Typography>
      <Typography className="profile-item"><strong>Adresse:</strong> {user.adresse || "Nicht angegeben"}</Typography>

      <Button
        variant="outlined"
        color="primary"
        className="change-password-button"
        onClick={() => setOpen(true)}
      >
        Passwort ändern
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Passwort ändern</DialogTitle>
        <DialogContent>
          <TextField
            label="Altes Passwort"
            type="password"
            fullWidth
            margin="dense"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            label="Neues Passwort"
            type="password"
            fullWidth
            margin="dense"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Neues Passwort bestätigen"
            type="password"
            fullWidth
            margin="dense"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Abbrechen
          </Button>
          <Button onClick={handlePasswordChange} color="primary" variant="contained">
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfilePage;
