import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterPage from '@/pages/register';
import api from '@/lib/api';
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

jest.mock('@/lib/api');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('RegisterPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  it('submits form and shows success notification', async () => {
    (api.post as jest.Mock).mockResolvedValue({ data: { message: 'Registro exitoso' } });

    render(<RegisterPage />);

    fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByTestId('input-tenant'), { target: { value: 'Test Tenant' } });
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: '123456' } });

    fireEvent.click(screen.getByTestId('btn-register'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/users/register', {
        name: 'Test User',
        tenantName: 'Test Tenant',
        email: 'user@example.com',
        password: '123456',
      });
    });

    expect(await screen.findByText(/Registro exitoso/i)).toBeInTheDocument();
  });

  it('shows error notification if api fails', async () => {
    const axiosResponse: AxiosResponse<{ message: string }> = {
      data: { message: 'Email ya existe' },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      config: {
        url: '',
        method: 'post',
        headers: {},
      },
    } as unknown as AxiosResponse<{ message: string }>;

    const axiosError = new AxiosError('Error', undefined, undefined, undefined, axiosResponse);

    (api.post as jest.Mock).mockRejectedValue(axiosError);

    render(<RegisterPage />);

    fireEvent.change(screen.getByTestId('input-name'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByTestId('input-tenant'), { target: { value: 'Test Tenant' } });
    fireEvent.change(screen.getByTestId('input-email'), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByTestId('input-password'), { target: { value: '123456' } });

    fireEvent.click(screen.getByTestId('btn-register'));

    expect(await screen.findByText(/Email ya existe/i)).toBeInTheDocument();
  });
});