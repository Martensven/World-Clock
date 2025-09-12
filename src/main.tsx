import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.querySelector('#root')!).render(

  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>

);