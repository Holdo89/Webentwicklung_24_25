// src/App.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('zeigt WelcomePage auf "/"', () => {
  render(<App />);
  expect(screen.getByText(/Willkommen bei/i)).toBeInTheDocument();
});
