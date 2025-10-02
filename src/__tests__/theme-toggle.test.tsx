import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Theme toggle', () => {
  it('switches between light and dark themes', () => {
    render(<App />);
    const btn = screen.getByTestId('theme-toggle-btn');
    expect(btn).toHaveTextContent(/Светлая|🌞/);
    fireEvent.click(btn);
    expect(btn).toHaveTextContent(/Тёмная|🌙/);
    fireEvent.click(btn);
    expect(btn).toHaveTextContent(/Светлая|🌞/);
  });
});
