import { FC } from 'react';
import {
  Overlay,
  Modal,
  IconWrapper,
  Title,
  Message,
  ButtonRow,
  ConfirmButton,
  CancelButton,
} from '@/styles/modalDelete.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  title = 'Confirmar Eliminación',
  message = '¿Desea eliminar este dato? Esta acción es irreversible',
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
  <Overlay data-testid="delete-modal">
    <Modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-message"
    >
      <Title id="modal-title">{title}</Title>
      <IconWrapper>
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </IconWrapper>
      <Message id="modal-message">{message}</Message>
      <ButtonRow>
        <ConfirmButton data-testid="confirm-btn" onClick={onConfirm}>
          <FontAwesomeIcon icon={faTrash} /> Eliminar
        </ConfirmButton>
        <CancelButton data-testid="cancel-btn" onClick={onCancel}>
          <FontAwesomeIcon icon={faTimes} /> Cancelar
        </CancelButton>
      </ButtonRow>
    </Modal>
  </Overlay>
  );
};

export default ConfirmationModal;