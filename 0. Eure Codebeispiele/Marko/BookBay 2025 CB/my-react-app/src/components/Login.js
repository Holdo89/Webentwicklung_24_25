import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function Login({ onLoginSuccess, onRegisterClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async(e)=>{
    e.preventDefault();

    if (!email || !password) {
      setError('Bitte, geben Sie Ihre E-Mail und Ihr Password ein');
      return;
    }

    try {
        const response =await fetch ('http://localhost:3001/login',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            setError(errorMessage);
          } else {
            const data = await response.json();
            console.log('Login erfolgreich', data);
            onLoginSuccess();
            setEmail('');
            setPassword('');
            setError('');
          }
        } catch (error) {
          setError('Ein Fehler ist aufgetreten');
          console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" textAlign="center" mb={3}>
          Login
        </Typography>

        {error && (
          <Typography color="error" mb={2} textAlign="center">
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
        >
          Log In
        </Button>

        <Button
          type="submit"
          variant="outlined"
          width ="100px"
          sx={{ mt: 2 }}
          onClick={onRegisterClick}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
}
