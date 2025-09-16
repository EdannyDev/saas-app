import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TenantsPage from '@/pages/tenants';
import api from '@/lib/api';
import '@testing-library/jest-dom';

jest.mock('@/lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

const mockTenants = [
  { _id: 't1', name: 'Tenant 1', plan: 'free', createdAt: '2025-09-01' },
];

describe('TenantsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/tenants') return Promise.resolve({ data: mockTenants });
      if (url === '/users/me') return Promise.resolve({
        data: { _id: 'u1', name: 'Admin', email: 'a@a.com', role: 'admin' },
      });
      return Promise.reject(new Error('Not found'));
    });

    mockedApi.post.mockResolvedValue({ data: { _id: 't2', name: 'Tenant 2', plan: 'pro', createdAt: '2025-09-15' } });
    mockedApi.put.mockResolvedValue({ data: { _id: 't1', name: 'Tenant 1 updated', plan: 'pro', createdAt: '2025-09-01' } });
    mockedApi.delete.mockResolvedValue({ data: {} });
  });

  it('renders page and creates a tenant', async () => {
    render(<TenantsPage />);
    expect(await screen.findByText('Tenant 1')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/nombre de la empresa \/ startup/i), { target: { value: 'Tenant 2' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'pro' } });

    fireEvent.click(screen.getByRole('button', { name: /crear empresa \/ startup/i }));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith('/tenants', {
        name: 'Tenant 2',
        plan: 'pro',
      });
    });

    await waitFor(() => {
      const tenantsCalls = mockedApi.get.mock.calls.filter(call => call[0] === '/tenants');
      expect(tenantsCalls.length).toBe(2);
    });

    expect(await screen.findByText(/tenant creado/i)).toBeInTheDocument();
  });

  it('edits a tenant', async () => {
    render(<TenantsPage />);
    
    const editButton = await screen.findByTestId('edit-tenant-t1');
    fireEvent.click(editButton);

    fireEvent.change(screen.getByPlaceholderText(/nombre de la empresa \/ startup/i), { target: { value: 'Tenant 1 updated' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'pro' } });

    fireEvent.click(screen.getByRole('button', { name: /actualizar empresa \/ startup/i }));

    await waitFor(() => {
      expect(mockedApi.put).toHaveBeenCalledWith('/tenants/t1', {
        name: 'Tenant 1 updated',
        plan: 'pro',
      });
    });

    await waitFor(() => {
      const tenantsCalls = mockedApi.get.mock.calls.filter(call => call[0] === '/tenants');
      expect(tenantsCalls.length).toBe(2);
    });

    expect(await screen.findByText(/tenant actualizado/i)).toBeInTheDocument();
  });

  it('deletes a tenant', async () => {
    render(<TenantsPage />);
    
    const deleteButton = await screen.findByTestId('delete-tenant-t1');
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByTestId('confirm-btn');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalledWith('/tenants/t1');
    });

    await waitFor(() => {
      const tenantsCalls = mockedApi.get.mock.calls.filter(call => call[0] === '/tenants');
      expect(tenantsCalls.length).toBe(2);
    });

    expect(await screen.findByText(/tenant eliminado/i)).toBeInTheDocument();
  });
});