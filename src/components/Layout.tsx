import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <header>
      <nav>
        <Link to="/">Главная</Link> | <Link to="/clients">Клиенты</Link> | <Link to="/sessions">Тренировки</Link> | <Link to="/calendar">Календарь</Link> | <Link to="/statistics">Статистика</Link> | <Link to="/settings">Настройки</Link>
      </nav>
    </header>
    <main>{children}</main>
  </div>
);

export default Layout;
