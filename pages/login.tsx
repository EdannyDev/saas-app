import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { useState } from 'react';
import api from '@/lib/api';
import { 
  LoginContainer, 
  LoginForm, 
  InputWrapper, 
  Input, 
  Icon, 
  Button, 
  Label, 
  Title, 
  TogglePasswordIcon, 
  RedirectText,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalIcon,
  ModalInputWrapper,
  ModalFooter,
  CancelButton,
  SendButton
} from '@/styles/login.styles';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye, faEyeSlash, faPaperPlane, faTimes } from '@fortawesome/free-solid-svg-icons';

interface NotificationType {
  message: string;
  type: 'success' | 'error';
  persistent?: boolean;
}

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const showNotification = (
    message: string, 
    type: 'success' | 'error', 
    persistent: boolean = false
  ) => {
    setNotification({ message, type, persistent });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    try {
      await api.post('/users/login', { email, password });
      showNotification('Inicio de sesión exitoso', 'success');
      setTimeout(() => router.push('/dashboard'), 800);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        showNotification(err.response?.data?.message || 'Error desconocido', 'error');
      } else {
        showNotification('Error desconocido', 'error');
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!resetEmail) return showNotification('Ingresa tu correo', 'error');
    setLoading(true);
    try {
      const res = await api.post('/users/reset-password', { email: resetEmail });

      setShowModal(false);
      setResetEmail('');

      if (res.data?.tempPassword) {
        showNotification(
          `Contraseña temporal generada: ${res.data.tempPassword}`,
          'success',
          true
        );
      } else {
        showNotification(
          'Se ha enviado un correo de restablecimiento a tu email',
          'success'
        );
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        showNotification('Error al enviar correo, contacta al administrador', 'error');
      } else {
        showNotification('Error desconocido', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginForm aria-label='login-form' onSubmit={handleSubmit}>
        <Title>Inicia sesión</Title>

        <InputWrapper>
          <Label htmlFor="email">Correo electrónico</Label>
          <Icon>
            <FontAwesomeIcon icon={faEnvelope} />
          </Icon>
          <Input
            id="email"
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Label htmlFor="password">Contraseña</Label>
          <Icon>
            <FontAwesomeIcon icon={faLock} />
          </Icon>
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TogglePasswordIcon onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </TogglePasswordIcon>
        </InputWrapper>

        <Button type="submit">Iniciar sesión</Button>

        <RedirectText>
          ¿No tienes cuenta?{' '}
          <span onClick={() => router.push('/register')}>Regístrate</span>
        </RedirectText>

        <RedirectText>
          ¿Olvidaste tu contraseña?{' '}
          <span className="reset-link" onClick={() => setShowModal(true)}>Restablecer</span>
        </RedirectText>
      </LoginForm>

      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type}
          persistent={notification.persistent}
          onClose={() => setNotification(null)}
        />
      )}

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h3>Restablecer contraseña</h3>
            </ModalHeader>
            <ModalBody>
              <Label htmlFor="resetEmail">Correo electrónico</Label>
              <ModalInputWrapper>
                <ModalIcon>
                  <FontAwesomeIcon icon={faEnvelope} />
                </ModalIcon>
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="Ingresa tu correo"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </ModalInputWrapper>
            </ModalBody>
            <ModalFooter>
              <CancelButton type="button" onClick={() => setShowModal(false)}>
                <FontAwesomeIcon icon={faTimes} style={{ marginRight: '4px' }} />
                Cancelar
              </CancelButton>
              <SendButton onClick={handlePasswordReset} disabled={loading}>
                <FontAwesomeIcon icon={faPaperPlane} style={{ marginRight: '4px' }} />
                {loading ? 'Enviando...' : 'Enviar correo'}
              </SendButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </LoginContainer>
  );
};

export default LoginPage;