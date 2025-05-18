import React from 'react';
import { RouterProvider } from './components/router/Router';
import { PredictionProvider } from './contexts/PredictionContext';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <PredictionProvider>
        <RouterProvider />
      </PredictionProvider>
    </ThemeProvider>
  );
}

export default App;