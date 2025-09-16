import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { 
  RegisterContainer, 
  RegisterForm, 
  InputWrapper, 
  Input, 
  Icon, 
  Button, 
  Label, 
  Title,
  Tooltip, 
  TogglePasswordIcon, 
  RedirectText 
} from '@/styles/register.styles';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faBuilding, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface NotificationType {
  message: string;
  type: 'success' | 'error';
}

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [showTenantField, setShowTenantField] = useState(true);
  
  const isAdmin = email.toLowerCase().endsWith('@saas.io');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAdmin) {
      setShowTenantField(true);
      setShowTooltip(true);
      timer = setTimeout(() => {
        setShowTenantField(false);
      }, 2000);
    } else {
      setShowTenantField(true);
    }
    return () => clearTimeout(timer);
  }, [isAdmin]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setNotification(null);
  try {
    await api.post('/users/register', { name, tenantName, email, password });
    showNotification('Registro exitoso', 'success');
    setTimeout(() => router.push('/login'), 800);
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      showNotification(err.response?.data?.message || 'Error desconocido', 'error');
    } else {
      showNotification('Error desconocido', 'error');
      }
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Crear cuenta</Title>

        <InputWrapper>
          <Label htmlFor="name">Nombre</Label>
          <Icon>
            <FontAwesomeIcon icon={faUser} />
          </Icon>
          <Input
            id="name"
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            data-testid="input-name"
          />
        </InputWrapper>

        {showTenantField && (
          <InputWrapper
            onMouseEnter={() => !isAdmin && tenantName === '' && setShowTooltip(true)}
            onMouseLeave={() => !isAdmin && setShowTooltip(false)}
          >
            <Label htmlFor="tenantName">Empresa</Label>
            <Icon>
              <FontAwesomeIcon icon={faBuilding} />
            </Icon>
            <Input
              id="tenantName"
              type="text"
              placeholder={
                isAdmin ? "No necesitas empresa si eres admin" : "Ingresa tu startup o empresa"
              }
              value={tenantName}
              onChange={(e) => {
                setTenantName(e.target.value);
                if (!isAdmin) {
                  if (e.target.value !== '') setShowTooltip(false);
                  else setShowTooltip(true);
                }
              }}
              onFocus={() => !isAdmin && tenantName === '' && setShowTooltip(true)}
              onBlur={() => !isAdmin && setShowTooltip(false)}
              required={!isAdmin}
              disabled={isAdmin}
              data-testid="input-tenant"
            />
            {showTooltip && (
              <Tooltip data-testid="tooltip">
                {isAdmin
                  ? "Como admin, no necesitas asociar una empresa"
                  : "Este será el espacio donde se guardarán tus métricas y datos."}
              </Tooltip>
            )}
          </InputWrapper>
        )}

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
            data-testid="input-email"
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
            data-testid="input-password"
          />
          <TogglePasswordIcon data-testid="toggle-password" onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
          </TogglePasswordIcon>
        </InputWrapper>

        <Button type="submit" data-testid="btn-register">Registrarse</Button>

        <RedirectText>
          ¿Ya tienes cuenta?{' '}
          <span onClick={() => router.push('/login')} data-testid="redirect-login">Inicia sesión</span>
        </RedirectText>
      </RegisterForm>

      {notification && <Notification message={notification.message} type={notification.type} />}
    </RegisterContainer>
  );
};

export default RegisterPage;