import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/pages/login';
import api from '@/lib/api';
import { useRouter } from 'next/router';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosHeaders } from 'axios';

jest.mock('@/lib/api');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('renderiza el formulario de login y campos por defecto', () => {
    render(<LoginPage />);
    expect(screen.getByText(/Inicia sesión/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
  });

  it('envía el formulario y redirige al dashboard si login es exitoso', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: {} });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: '123456' } });

    const form = screen.getByRole('form', { name: /login-form/i });
    fireEvent.submit(form);

    await waitFor(() => expect(screen.getByText(/Inicio de sesión exitoso/i)).toBeInTheDocument());
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/dashboard'));
  });

  it('muestra notificación de error si login falla', async () => {
    const fakeConfig: InternalAxiosRequestConfig = {
      url: '/users/login',
      method: 'post',
      headers: new AxiosHeaders(),
    };

    const fakeResponse: AxiosResponse = {
      data: { message: 'Credenciales inválidas' },
      status: 401,
      statusText: 'Unauthorized',
      headers: new AxiosHeaders(),
      config: fakeConfig,
    };

    const error = new AxiosError('Unauthorized', '401', fakeConfig, null, fakeResponse);
    (api.post as jest.Mock).mockRejectedValueOnce(error);

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'wrong@test.com' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'wrongpass' } });

    const form = screen.getByRole('form', { name: /login-form/i });
    fireEvent.submit(form);

    await waitFor(() => expect(screen.getByText(/Credenciales inválidas/i)).toBeInTheDocument());
  });

  it('abre modal de restablecimiento de contraseña y envía correo exitosamente', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { tempPassword: 'abc123' } });

    render(<LoginPage />);

    fireEvent.click(screen.getByText(/Restablecer/i));
    expect(screen.getByText(/Restablecer contraseña/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Correo electrónico', { selector: '#resetEmail' }), {
      target: { value: 'user@test.com' },
    });
    fireEvent.click(screen.getByText(/Enviar correo/i));

    await waitFor(() => expect(screen.getByText(/Contraseña temporal generada: abc123/i)).toBeInTheDocument());
  });

  it('muestra error si restablecimiento de contraseña falla', async () => {
    const fakeConfig: InternalAxiosRequestConfig = {
      url: '/users/reset-password',
      method: 'post',
      headers: new AxiosHeaders(),
    };

    const fakeResponse: AxiosResponse = {
      data: {},
      status: 500,
      statusText: 'Internal Server Error',
      headers: new AxiosHeaders(),
      config: fakeConfig,
    };

    const error = new AxiosError('Server Error', '500', fakeConfig, null, fakeResponse);
    (api.post as jest.Mock).mockRejectedValueOnce(error);

    render(<LoginPage />);
    fireEvent.click(screen.getByText(/Restablecer/i));

    fireEvent.change(screen.getByLabelText('Correo electrónico', { selector: '#resetEmail' }), {
      target: { value: 'user@test.com' },
    });
    fireEvent.click(screen.getByText(/Enviar correo/i));

    await waitFor(() =>
      expect(screen.getByText(/Error al enviar correo, contacta al administrador/i)).toBeInTheDocument()
    );
  });
});