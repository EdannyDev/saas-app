import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Navbar from '@/components/navbar';
import api from '@/lib/api';

describe('Navbar', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: { role: 'admin' } });
  });

  it('muestra links y rol del usuario', async () => {
    render(<Navbar />);
    await waitFor(() => {
      expect(screen.getByText('Usuarios')).toBeInTheDocument();
      expect(screen.getByText('Configurar Perfil')).toBeInTheDocument();
    });
  });

  it('abre y cierra menú móvil', async () => {
    render(<Navbar />);
    const toggle = screen.getByTestId('navbar-toggle');
    fireEvent.click(toggle);
    await waitFor(() => {
      expect(screen.getByText('Métricas')).toBeVisible();
    });
    fireEvent.click(toggle);
    await waitFor(() => {
      expect(screen.getByText('Métricas')).toBeInTheDocument();
    });
  });
});