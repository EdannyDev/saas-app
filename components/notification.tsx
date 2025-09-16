import { useEffect, useState } from 'react';
import { 
  ToastContainer, 
  ToastIcon, 
  ToastMessage, 
  ToastClose 
} from '@/styles/notification.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  duration?: number;
  persistent?: boolean;
  onClose?: () => void;
}

const Notification = ({
  message,
  type,
  duration = 3000,
  persistent = false,
  onClose,
}: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!persistent) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, persistent, onClose]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  if (!visible) return null;

  return (
  <ToastContainer 
    type={type} 
    role="alert" 
    aria-live="assertive" 
    aria-atomic="true"
  >
    <ToastIcon>
      <FontAwesomeIcon icon={type === 'success' ? faCheckCircle : faExclamationCircle} />
    </ToastIcon>
    <ToastMessage>{message}</ToastMessage>
    {persistent && (
      <ToastClose onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </ToastClose>
    )}
  </ToastContainer>
  );
};

export default Notification;