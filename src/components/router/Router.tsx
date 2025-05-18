import React, { useState } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Dashboard from '../pages/Dashboard';
import MapView from '../pages/MapView';
import About from '../pages/About';

type Route = 'dashboard' | 'map' | 'about';

export const RouterProvider: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('dashboard');

  const renderContent = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <MapView />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentRoute={currentRoute} setCurrentRoute={setCurrentRoute} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};