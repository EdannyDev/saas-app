import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import api from '@/lib/api';
import {
  SidebarContainer,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarLink,
  SidebarButton,
  SidebarSeparator,
} from '@/styles/sidebar.styles';
import Notification from './notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faBuilding, faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Sidebar: FC = () => {
  const router = useRouter();
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'analyst' | 'viewer' | null>(null);

  useEffect(() => {
    setMounted(true);
    const fetchUserRole = async () => {
      try {
        const res = await api.get('/users/me');
        setUserRole(res.data.role);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserRole();
  }, []);

  const currentPath = router.pathname;

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      setNotification({ type: 'success', message: 'Sesión cerrada correctamente' });
      setTimeout(() => router.push('/login'), 3000);
    } catch (error: unknown) {
      let message = 'Error al cerrar sesión';
      if ((error as AxiosError).isAxiosError) {
        const axiosError = error as AxiosError<{ message?: string }>;
        message = axiosError.response?.data?.message || message;
      }
      setNotification({ type: 'error', message });
    }
  };

  return (
    <SidebarContainer>
      <SidebarHeader href="/dashboard">Techno SaaS</SidebarHeader>

      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarLink href="/metrics" $active={mounted && currentPath === '/metrics'}>
            <FontAwesomeIcon icon={faChartLine} />
            Métricas
          </SidebarLink>
        </SidebarMenuItem>

        <SidebarSeparator />

        <SidebarMenuItem>
          <SidebarLink href="/tenants" $active={mounted && currentPath === '/tenants'}>
            <FontAwesomeIcon icon={faBuilding} />
            Empresas / Startups
          </SidebarLink>
        </SidebarMenuItem>

        <SidebarSeparator />

        {userRole === 'admin' && (
          <SidebarMenuItem>
            <SidebarLink href="/users" $active={mounted && currentPath === '/users'}>
              <FontAwesomeIcon icon={faUsers} />
              Usuarios
            </SidebarLink>
          </SidebarMenuItem>
        )}

        {userRole === 'admin' && (<SidebarSeparator />)}

        <SidebarMenuItem>
          <SidebarLink href="/profile" $active={mounted && currentPath === '/profile'}>
            <FontAwesomeIcon icon={faUserCog} />
            Configurar Perfil
          </SidebarLink>
        </SidebarMenuItem>

        <SidebarSeparator />

        <SidebarMenuItem>
          <SidebarButton onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            Cerrar Sesión
          </SidebarButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          duration={3000}
          onClose={() => setNotification(null)}
        />
      )}
    </SidebarContainer>
  );
};

export default Sidebar;