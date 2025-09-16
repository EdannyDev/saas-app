import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '@/pages/dashboard';
import api from '@/lib/api';
import { useRouter } from 'next/router';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

jest.mock('@/lib/api');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('DashboardPage', () => {
  const mockPush = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renderiza el mensaje de bienvenida por defecto', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Este es tu panel de inicio/i)).toBeInTheDocument();
  });

  it('muestra el nombre y rol del usuario cuando api.get es exitoso', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { _id: '1', name: 'Danny', role: 'admin' },
    });

    render(<DashboardPage />);

    expect(await screen.findByText(/Bienvenido, Danny/i)).toBeInTheDocument();
    expect(screen.getByText(/Rol:/i)).toBeInTheDocument();
    expect(screen.getByText(/admin/i)).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  it('redirecciona a /login si la API responde con 401', async () => {
    const fakeResponse: AxiosResponse = {
      data: {},
      status: 401,
      statusText: 'Unauthorized',
      headers: new AxiosHeaders(),
      config: { headers: new AxiosHeaders() } as InternalAxiosRequestConfig,
    };

    const error = new AxiosError(
      'Unauthorized',
      '401',
      fakeResponse.config,
      null,
      fakeResponse
    );

    (api.get as jest.Mock).mockRejectedValueOnce(error);

    render(<DashboardPage />);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/login'));
  });

  it('muestra la fecha actual en formato es-MX', () => {
    render(<DashboardPage />);
    const now = new Date().toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    expect(screen.getByText(now)).toBeInTheDocument();
  });
});