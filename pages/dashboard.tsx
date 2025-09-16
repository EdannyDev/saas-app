import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import api from '@/lib/api';
import {
  DashboardContainer,
  Header,
  UserCircle,
  InfoRow,
  WelcomeMessage,
  InfoTextWithIcon
} from '@/styles/dashboard.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface UserProfile {
  _id: string;
  name: string;
  role: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/users/me`);
        setUser(res.data);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          router.push('/login');
        } else {
          console.error("Error al cargar perfil:", err);
        }
      }
    };
    fetchProfile();
  }, [router]);

  useEffect(() => {
    const now = new Date();
    setCurrentDate(
      now.toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const userColor = useMemo(() => {
    if (!user?.name) return '#3498db';
    let hash = 0;
    for (let i = 0; i < user.name.length; i++) {
      hash = user.name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`;
    return color;
  }, [user]);

  const userInitial = user?.name.charAt(0).toUpperCase() || '';

  return (
    <DashboardContainer>
      <Header>
        <UserCircle style={{ backgroundColor: userColor }}>
          {userInitial}
        </UserCircle>
        <h1>Bienvenido, {user?.name}</h1>
        <InfoRow>
          <span><strong>Rol:</strong> {user?.role}</span>
        </InfoRow>
        <InfoRow>
          <InfoTextWithIcon>
            <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '5px' }} />
            {currentDate}
          </InfoTextWithIcon>
        </InfoRow>
      </Header>

      <WelcomeMessage>
        <p>Este es tu panel de inicio.</p>
        <p>Comienza a explorar y gestionar tus métricas de manera sencilla.</p>
      </WelcomeMessage>
    </DashboardContainer>
  );
};

export default DashboardPage;