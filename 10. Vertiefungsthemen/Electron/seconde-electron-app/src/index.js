import * as React from 'react';
import { createRoot } from 'react-dom/client';
import Hello from './components/Hello';
import App from './react-dominic/src/App';

const root = createRoot(document.body);
root.render(<App/>);