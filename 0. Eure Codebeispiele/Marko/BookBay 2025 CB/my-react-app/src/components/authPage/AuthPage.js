import React, { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import Login from './login/Login';
import Register from './register/Register';

const AuthPage = ({ onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleLoginSuccess = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    onLoginSuccess(user);
  };

  const switchToRegister = () => setIsLoginView(false);
  const switchToLogin = () => setIsLoginView(true);

  return (
    <SnackbarProvider 
      maxSnack={3} 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <div className="auth-container">
        {isLoginView ? (
          <Login 
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <Register onSwitchToLogin={switchToLogin} />
        )}
      </div>
    </SnackbarProvider>
  );
};

export default AuthPage;