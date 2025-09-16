import { FC, useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import api from '@/lib/api';
import {
  NavbarContainer,
  NavbarBrand,
  NavbarToggle,
  NavbarItem,
  NavbarLink,
  MobileMenu,
} from '@/styles/navbar.styles';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartLine, faUsers, faBuilding, faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar: FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'analyst' | 'viewer' | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await api.post('/users/logout');
      setNotification({ type: 'success', message: 'Sesión cerrada correctamente' });
      setTimeout(() => router.push('/login'), 1000);
    } catch (error: unknown) {
      let message = 'Error al cerrar sesión';
      if (error instanceof AxiosError) {
        message = error.response?.data?.message || message;
      }
      setNotification({ type: 'error', message });
    }
  };

  return (
    <NavbarContainer>
      <NavbarBrand href="/dashboard">Techno SaaS</NavbarBrand>
      <NavbarToggle data-testid="navbar-toggle" ref={toggleRef} $open={menuOpen} onClick={() => setMenuOpen((prev) => !prev)}>
        <FontAwesomeIcon icon={faBars} />
      </NavbarToggle>
      <MobileMenu ref={menuRef} $open={menuOpen}>
        <NavbarLink href="/metrics" onClick={() => setMenuOpen(false)}>
          <NavbarItem $active={router.pathname === '/metrics'}>
            <FontAwesomeIcon icon={faChartLine} />
            Métricas
          </NavbarItem>
        </NavbarLink>

        <NavbarLink href="/tenants" onClick={() => setMenuOpen(false)}>
          <NavbarItem $active={router.pathname === '/tenants'}>
            <FontAwesomeIcon icon={faBuilding} />
            Empresas / Startups
          </NavbarItem>
        </NavbarLink>

        {userRole === 'admin' && (
          <NavbarLink href="/users" onClick={() => setMenuOpen(false)}>
            <NavbarItem $active={router.pathname === '/users'}>
              <FontAwesomeIcon icon={faUsers} />
              Usuarios
            </NavbarItem>
          </NavbarLink>
        )}

        <NavbarLink href="/profile" onClick={() => setMenuOpen(false)}>
          <NavbarItem $active={router.pathname === '/profile'}>
            <FontAwesomeIcon icon={faUserCog} />
            Configurar Perfil
          </NavbarItem>
        </NavbarLink>

        <NavbarItem onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          Cerrar Sesión
        </NavbarItem>
      </MobileMenu>

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          duration={3000}
          onClose={() => setNotification(null)}
        />
      )}
    </NavbarContainer>
  );
};

export default Navbar;