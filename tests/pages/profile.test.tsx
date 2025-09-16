import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfilePage from '@/pages/profile';
import api from '@/lib/api';
import { useRouter } from 'next/router';

jest.mock('@/lib/api');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('ProfilePage', () => {
  const mockUser = {
    _id: 'u1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  };

  let replaceMock: jest.Mock;

  const mockedApi = api as jest.Mocked<typeof api>;

  beforeEach(() => {
    replaceMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: replaceMock });

    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/users/me') return Promise.resolve({ data: mockUser });
      return Promise.reject();
    });

    mockedApi.put.mockReset();
    mockedApi.post.mockReset();
    mockedApi.delete.mockReset();
  });

  it('renders profile with user data', async () => {
    render(<ProfilePage />);

    await waitFor(() => {
      expect(screen.getByTestId('profile-name')).toHaveValue(mockUser.name);
      expect(screen.getByTestId('profile-email')).toHaveValue(mockUser.email);
    });
  });

  it('updates profile without password', async () => {
    mockedApi.put.mockResolvedValue({ data: { updatedUser: mockUser } });

    render(<ProfilePage />);

    await waitFor(() => screen.getByTestId('update-profile-btn'));

    fireEvent.change(screen.getByTestId('profile-name'), {
      target: { value: 'Admin User Updated' },
    });

    fireEvent.click(screen.getByTestId('update-profile-btn'));

    await waitFor(() => {
      expect(mockedApi.put).toHaveBeenCalledWith(
        `/users/profile/${mockUser._id}`,
        { name: 'Admin User Updated', email: mockUser.email, password: '' }
      );
      expect(screen.getByText('Perfil actualizado correctamente')).toBeInTheDocument();
    });
  });

  it('updates profile with password and logs out', async () => {
    jest.useFakeTimers();

    mockedApi.put.mockResolvedValue({ data: { updatedUser: mockUser } });
    mockedApi.post.mockResolvedValue({});

    render(<ProfilePage />);

    await waitFor(() => screen.getByTestId('profile-password'));

    fireEvent.change(screen.getByTestId('profile-password'), {
      target: { value: 'newpassword123' },
    });

    fireEvent.click(screen.getByTestId('update-profile-btn'));

    await waitFor(() => {
      expect(mockedApi.put).toHaveBeenCalledWith(
        `/users/profile/${mockUser._id}`,
        { name: mockUser.name, email: mockUser.email, password: 'newpassword123' }
      );
      expect(mockedApi.post).toHaveBeenCalledWith('/users/logout');
    });

    jest.advanceTimersByTime(2000);
    expect(replaceMock).toHaveBeenCalledWith('/login');

    jest.useRealTimers();
  });

  it('opens and cancels delete modal', async () => {
    render(<ProfilePage />);

    await waitFor(() => screen.getByTestId('delete-profile-btn'));

    fireEvent.click(screen.getByTestId('delete-profile-btn'));

    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('cancel-btn'));
    expect(screen.queryByTestId('delete-modal')).not.toBeInTheDocument();
  });

  it('confirms delete account and logs out', async () => {
    jest.useFakeTimers();
    mockedApi.delete.mockResolvedValue({});
    mockedApi.post.mockResolvedValue({});

    render(<ProfilePage />);

    await waitFor(() => screen.getByTestId('delete-profile-btn'));

    fireEvent.click(screen.getByTestId('delete-profile-btn'));
    fireEvent.click(screen.getByTestId('confirm-btn'));

    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalledWith(`/users/profile/${mockUser._id}`);
      expect(mockedApi.post).toHaveBeenCalledWith('/users/logout');
    });

    jest.advanceTimersByTime(2000);
    expect(replaceMock).toHaveBeenCalledWith('/login');

    jest.useRealTimers();
  });
});