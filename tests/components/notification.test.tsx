import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Notification from '@/components/notification';

describe('Notification', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza mensaje y tipo correctamente', () => {
    render(<Notification message="Éxito!" type="success" persistent onClose={onClose} />);
    expect(screen.getByText('Éxito!')).toBeInTheDocument();
  });

  it('desaparece automáticamente si persistent es false', async () => {
    render(<Notification message="Error!" type="error" duration={100} onClose={onClose} />);

    expect(screen.getByText('Error!')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Error!')).toBeNull();
      expect(onClose).toHaveBeenCalledTimes(1);
    }, { timeout: 200 });
  });

  it('llama onClose al hacer click en botón de cerrar', () => {
    render(<Notification message="Éxito!" type="success" persistent onClose={onClose} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Éxito!')).toBeNull();
  });
});