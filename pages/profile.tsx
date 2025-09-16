import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import api from '@/lib/api';
import {
  ProfileContainer,
  ProfileHeader,
  ProfileForm,
  ProfileFieldWrapper,
  ProfileLabel,
  ProfileInputRow,
  ProfileInputWrapper,
  ProfileInput,
  InputIcon,
  TogglePasswordIcon,
  ProfileDescription,
  Separator,
  ProfileButtonRow,
  ProfileUpdateButton,
  ProfileDeleteButton
} from '@/styles/profile.styles';
import Modal from '@/components/modalDelete';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faUserTimes, faEye, faEyeSlash, faUserEdit } from '@fortawesome/free-solid-svg-icons';

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
}

interface NotificationType {
  message: string;
  type: 'success' | 'error';
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const logoutAndRedirect = async (message: string) => {
    try {
      await api.post('/users/logout');
    } catch (err) {
      console.error('Error en logout:', err);
    } finally {
      setNotification({ message, type: 'success' });
      setTimeout(() => {
        router.replace('/login');
      }, 2000);
    }
  };

  const loadProfile = useCallback(async () => {
    try {
      const res = await api.get<UserProfile>('/users/me');
      setUser(res.data);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch {
      router.replace('/login');
    }
  }, [router]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    const isPasswordChange = password.trim() !== '';

    try {
      const res = await api.put<{ updatedUser: UserProfile }>(
        `/users/profile/${user._id}`,
        { name, email, password }
      );

      if (isPasswordChange) {
        await logoutAndRedirect('Contraseña actualizada. Vuelve a iniciar sesión.');
      } else {
        showNotification('Perfil actualizado correctamente', 'success');
        setUser(res.data.updatedUser);
      }

      setPassword('');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      showNotification(error?.response?.data?.message || 'Error al actualizar perfil', 'error');
    }
  };

  const handleDelete = () => setIsModalOpen(true);

  const confirmDelete = async () => {
    if (!user) return;
    try {
      await api.delete(`/users/profile/${user._id}`);
      await logoutAndRedirect('Tu cuenta ha sido eliminada. Hasta pronto');
    } catch {
      showNotification('Error al eliminar cuenta', 'error');
    } finally {
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => setIsModalOpen(false);

  if (!user) return null;

  return (
    <ProfileContainer>
      <ProfileHeader>
        <h1>Perfil de Usuario</h1>
      </ProfileHeader>

      <ProfileForm onSubmit={handleUpdate} aria-label='profile-form'>
        <ProfileFieldWrapper>
          <ProfileLabel>Nombre</ProfileLabel>
          <ProfileInputRow>
            <ProfileInputWrapper>
              <InputIcon>
                <FontAwesomeIcon icon={faUser} />
              </InputIcon>
              <ProfileInput
                data-testid='profile-name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                required
              />
            </ProfileInputWrapper>
            <ProfileDescription>Nombre que se mostrará en el sistema.</ProfileDescription>
          </ProfileInputRow>
        </ProfileFieldWrapper>
        <Separator />

        <ProfileFieldWrapper>
          <ProfileLabel>Email</ProfileLabel>
          <ProfileInputRow>
            <ProfileInputWrapper>
              <InputIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </InputIcon>
              <ProfileInput
                data-testid='profile-email'
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
              />
            </ProfileInputWrapper>
            <ProfileDescription>Correo electrónico registrado en el sistema.</ProfileDescription>
          </ProfileInputRow>
        </ProfileFieldWrapper>
        <Separator />

        <ProfileFieldWrapper>
          <ProfileLabel>Contraseña</ProfileLabel>
          <ProfileInputRow>
            <ProfileInputWrapper>
              <InputIcon>
                <FontAwesomeIcon icon={faLock} />
              </InputIcon>
              <ProfileInput
                data-testid='profile-password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nueva contraseña"
              />
              <TogglePasswordIcon onClick={() => setShowPassword(!showPassword)}>
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </TogglePasswordIcon>
            </ProfileInputWrapper>
            <ProfileDescription>Recuerda crear una contraseña segura.</ProfileDescription>
          </ProfileInputRow>
        </ProfileFieldWrapper>
        <Separator />

        <ProfileFieldWrapper>
          <ProfileInputRow>
            <ProfileInputWrapper>
              <h3>Rol: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</h3>
            </ProfileInputWrapper>
            <ProfileDescription>
              Rol asignado por el sistema. <span style={{ color: '#dc3545', fontWeight: 'bold' }}>NO</span> es editable.
            </ProfileDescription>
          </ProfileInputRow>
        </ProfileFieldWrapper>
        <Separator />

        <ProfileButtonRow>
          <ProfileUpdateButton type="submit" data-testid='update-profile-btn'>
            <FontAwesomeIcon icon={faUserEdit} />
            Actualizar Perfil
          </ProfileUpdateButton>
          <ProfileDeleteButton type="button" data-testid='delete-profile-btn' onClick={handleDelete}>
            <FontAwesomeIcon icon={faUserTimes} />
            Eliminar Cuenta
          </ProfileDeleteButton>
        </ProfileButtonRow>
      </ProfileForm>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title="Confirmar Eliminación"
          message="¿Deseas eliminar tu cuenta? Esta acción es irreversible"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </ProfileContainer>
  );
};

export default ProfilePage;