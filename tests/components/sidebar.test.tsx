import { render, screen, waitFor } from '@testing-library/react';
import Sidebar from '@/components/sidebar';
import api from '@/lib/api';

describe('Sidebar', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: { role: 'admin' } });
  });

  it('muestra links según el rol del usuario', async () => {
    render(<Sidebar />);
    await waitFor(() => {
      expect(screen.getByText('Usuarios')).toBeInTheDocument();
      expect(screen.getByText('Configurar Perfil')).toBeInTheDocument();
    });
  });

  it('resalta la ruta activa', async () => {
    render(<Sidebar />);
    await waitFor(() => {
      const activeLink = screen.getByText('Métricas');
      expect(activeLink.closest('a')).toHaveAttribute('href', '/metrics');
    });
  });
});