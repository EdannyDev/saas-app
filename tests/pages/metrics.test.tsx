import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MetricsPage from '@/pages/metrics';
import api from '@/lib/api';
import '@testing-library/jest-dom';

jest.mock('@/lib/api');
const mockedApi = api as jest.Mocked<typeof api>;

const mockMetrics = [
  { _id: 'm1', name: 'Metric 1', value: 10, date: '2025-09-01' },
];

describe('MetricsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedApi.get.mockImplementation((url: string) => {
      if (url === '/metrics') return Promise.resolve({ data: mockMetrics });
      if (url === '/users/me') return Promise.resolve({
        data: { _id: 'u1', name: 'Admin', email: 'a@a.com', role: 'admin' },
      });
      return Promise.reject(new Error('Not found'));
    });

    mockedApi.post.mockResolvedValue({ data: { _id: 'm2', name: 'Metric 2', value: 20, date: '2025-09-15' } });
    mockedApi.put.mockResolvedValue({ data: { _id: 'm1', name: 'Metric 1 updated', value: 15, date: '2025-09-02' } });
    mockedApi.delete.mockResolvedValue({ data: {} });
  });

  it('renders page and creates a metric', async () => {
    render(<MetricsPage />);
    expect(await screen.findByText('Metric 1')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Metric 2' } });
    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: '20' } });
    fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: '2025-09-15' } });

    fireEvent.click(screen.getByRole('button', { name: /crear métrica/i }));

    await waitFor(() => {
      expect(mockedApi.post).toHaveBeenCalledWith('/metrics', {
        name: 'Metric 2',
        value: 20,
        date: '2025-09-15',
      });
    });

    await waitFor(() => {
      const metricsCalls = mockedApi.get.mock.calls.filter(call => call[0] === '/metrics');
      expect(metricsCalls.length).toBe(2);
    });

    expect(await screen.findByText(/métrica creada/i)).toBeInTheDocument();
  });

  it('edits a metric', async () => {
    render(<MetricsPage />);
    const editButton = await screen.findByLabelText(/editar metric 1/i);
    fireEvent.click(editButton);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Metric 1 updated' } });
    fireEvent.change(screen.getByLabelText(/valor/i), { target: { value: '15' } });
    fireEvent.change(screen.getByLabelText(/fecha/i), { target: { value: '2025-09-02' } });

    fireEvent.click(screen.getByRole('button', { name: /actualizar métrica/i }));

    await waitFor(() => {
      expect(mockedApi.put).toHaveBeenCalledWith('/metrics/m1', {
        name: 'Metric 1 updated',
        value: 15,
        date: '2025-09-02',
      });
    });

    await waitFor(() => {
      const metricsCalls = mockedApi.get.mock.calls.filter(call => call[0] === '/metrics');
      expect(metricsCalls.length).toBe(2);
    });

    expect(await screen.findByText(/métrica actualizada/i)).toBeInTheDocument();
  });

  it('deletes a metric', async () => {
    render(<MetricsPage />);
    const deleteButton = await screen.findByLabelText(/eliminar metric 1/i);
    fireEvent.click(deleteButton);

    const confirmButton = await screen.findByTestId('confirm-btn');
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockedApi.delete).toHaveBeenCalledWith('/metrics/m1');
    });

    await waitFor(() => {
      const metricsCalls = mockedApi.get.mock.calls.filter(call => call[0] === '/metrics');
      expect(metricsCalls.length).toBe(2);
    });

    expect(await screen.findByText(/métrica eliminada/i)).toBeInTheDocument();
  });
});