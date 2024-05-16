import React from 'react';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import { createRoot } from "react-dom/client"
import "./index.css"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);