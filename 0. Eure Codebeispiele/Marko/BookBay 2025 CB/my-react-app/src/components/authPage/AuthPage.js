import React, { useState } from 'react';
import { SnackbarProvider } from 'notistack';
import Login from './login/Login';
import Register from './register/Register';

const AuthPage = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <div className="auth-wrapper">
        {isLogin ? (
          <Login
            onLoginSuccess={(user) => {
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("userId", user.id);
              onLoginSuccess(user);
            }}
            onSwitchToRegister={() => setIsLogin(false)}
          />
        ) : (
          <Register onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </SnackbarProvider>
  );
};

export default AuthPage;
