import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Brain, Map, BarChart3 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  currentRoute: string;
  setCurrentRoute: (route: any) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRoute, setCurrentRoute }) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);
  const handleNavigation = (route: string) => {
    setCurrentRoute(route);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-dark-800/90 backdrop-blur-sm shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary-600" strokeWidth={1.5} />
            <span className="text-xl font-bold text-primary-600">NeuralCrime</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => handleNavigation('dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentRoute === 'dashboard' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => handleNavigation('map')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentRoute === 'map' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              <Map className="h-5 w-5" />
              <span>Map</span>
            </button>
            <button 
              onClick={() => handleNavigation('about')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                currentRoute === 'about' 
                  ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              <span>About</span>
            </button>
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-primary-600" />
              )}
            </button>

            <button 
              onClick={handleMenuToggle} 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white dark:bg-dark-700 rounded-lg shadow-lg p-4 animate-fadeIn">
            <nav className="flex flex-col space-y-2">
              <button 
                onClick={() => handleNavigation('dashboard')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  currentRoute === 'dashboard' 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                }`}
              >
                <BarChart3 className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => handleNavigation('map')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  currentRoute === 'map' 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                }`}
              >
                <Map className="h-5 w-5" />
                <span>Map</span>
              </button>
              <button 
                onClick={() => handleNavigation('about')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  currentRoute === 'about' 
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700'
                }`}
              >
                <span>About</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;