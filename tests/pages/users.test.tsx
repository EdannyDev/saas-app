import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsersPage from '@/pages/users';
import api from '@/lib/api';
import '@testing-library/jest-dom';

jest.mock('@/lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

const mockUsers = Array.from({ length: 12 }, (_, i) => ({
  _id: `u${i + 1}`,
  name: `User ${i + 1}`,
  email: `user${i + 1}@test.com`,
  role: i % 2 === 0 ? 'admin' : 'viewer',
  createdAt: '2025-09-01',
}));

describe('UsersPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/users/list') return Promise.resolve({ data: mockUsers });
      return Promise.reject(new Error('Not found'));
    });

    mockedApi.put.mockResolvedValue({ data: { ...mockUsers[0], name: 'User 1 updated' } });
    mockedApi.delete.mockResolvedValue({ data: {} });
  });

  it('edits a user', async () => {
    render(<UsersPage />);
    expect(await screen.findByText('User 1')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('edit-u1'));
    fireEvent.change(screen.getByPlaceholderText(/nombre del usuario/i), { target: { value: 'User 1 updated' } });
    fireEvent.change(screen.getByPlaceholderText(/email del usuario/i), { target: { value: 'user1updated@test.com' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'analyst' } });

    fireEvent.click(screen.getByRole('button', { name: /actualizar usuario/i }));

    await waitFor(() => {
      expect(mockedApi.put).toHaveBeenCalledWith('/users/update/u1', {
        name: 'User 1 updated',
        email: 'user1updated@test.com',
        role: 'analyst',
      });
    });

    await waitFor(() => {
      const calls = mockedApi.get.mock.calls.filter(call => call[0] === '/users/list');
      expect(calls.length).toBe(2);
    });

    expect(await screen.findByText(/usuario actualizado/i)).toBeInTheDocument();
  });

  it('deletes a user', async () => {
    render(<UsersPage />);
    expect(await screen.findByText('User 1')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('delete-u1'));
    fireEvent.click(await screen.findByTestId('confirm-btn'));

    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalledWith('/users/delete/u1');
    });

    await waitFor(() => {
      const calls = mockedApi.get.mock.calls.filter(call => call[0] === '/users/list');
      expect(calls.length).toBe(2);
    });

    expect(await screen.findByText(/usuario eliminado/i)).toBeInTheDocument();
  });

  it('searches users', async () => {
    render(<UsersPage />);
    expect(await screen.findByText('User 1')).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/buscar usuarios/i);
    fireEvent.change(searchInput, { target: { value: 'User 5' } });

    expect(await screen.findByText('User 5')).toBeInTheDocument();
    expect(screen.queryByText('User 1')).not.toBeInTheDocument();
  });

  it('paginates users', async () => {
    render(<UsersPage />);
    expect(await screen.findByText('User 1')).toBeInTheDocument();

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`User ${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByText('User 6')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '2' }));

    for (let i = 6; i <= 10; i++) {
      expect(screen.getByText(`User ${i}`)).toBeInTheDocument();
    }
    expect(screen.queryByText('User 1')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '3' }));
    for (let i = 11; i <= 12; i++) {
      expect(screen.getByText(`User ${i}`)).toBeInTheDocument();
    }
  });
});