
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Home from './pages/Home';
import Clients from './pages/Clients';
import Sessions from './pages/Sessions';
import Calendar from './pages/Calendar';
import Statistics from './pages/Statistics';
import Settings from './pages/Settings';

const queryClient = new QueryClient();


function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <button
        onClick={toggleTheme}
        style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}
        aria-label="Переключить тему"
        data-testid="theme-toggle-btn"
      >
        {theme === 'light' ? '🌞 Светлая' : '🌙 Тёмная'}
      </button>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/itness-crm">
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/sessions" element={<Sessions />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
