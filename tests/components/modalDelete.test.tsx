import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmationModal from '@/components/modalDelete';

describe('ConfirmationModal', () => {
  const onConfirm = jest.fn();
  const onCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('no renderiza nada si isOpen es false', () => {
    const { container } = render(
      <ConfirmationModal isOpen={false} onConfirm={onConfirm} onCancel={onCancel} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renderiza título y mensaje correctamente', () => {
    render(
      <ConfirmationModal
        isOpen={true}
        title="Eliminar Item"
        message="¿Seguro que quieres eliminar?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );

    expect(screen.getByText('Eliminar Item')).toBeInTheDocument();
    expect(screen.getByText('¿Seguro que quieres eliminar?')).toBeInTheDocument();
  });

  it('llama a onConfirm y onCancel al hacer click en los botones', () => {
    render(
      <ConfirmationModal isOpen={true} onConfirm={onConfirm} onCancel={onCancel} />
    );

    fireEvent.click(screen.getByTestId('confirm-btn'));
    expect(onConfirm).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByTestId('cancel-btn'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});