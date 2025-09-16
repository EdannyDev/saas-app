import { render, screen, waitFor } from '@testing-library/react';
import Layout from '@/components/layout';
import api from '@/lib/api';

describe('Layout', () => {
  beforeEach(() => {
    (api.get as jest.Mock).mockResolvedValue({ data: { role: 'admin' } });
  });

  it('renderiza children correctamente', async () => {
    render(
      <Layout>
        <div>Contenido de prueba</div>
      </Layout>
    );
    await waitFor(() => {
      expect(screen.getByText('Contenido de prueba')).toBeInTheDocument();
    });
  });

  it('renderiza Sidebar y Navbar', async () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>
    );
    await waitFor(() => {
      expect(screen.getAllByText('Techno SaaS')[0]).toBeInTheDocument();
      expect(screen.getAllByText('Métricas')[0]).toBeInTheDocument();
    });
  });
});