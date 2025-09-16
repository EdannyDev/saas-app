import { useState, useEffect, useCallback, useMemo } from 'react';
import api from '@/lib/api';
import {
  MetricsContainer,
  MetricsHeader,
  FormRow,
  LabelWrapper,
  Label,
  Input,
  ButtonRow,
  CreateButton,
  CancelButton,
  SearchRow,
  SearchInputWrapper,
  TableWrapper,
  MetricsTable,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableActions,
  EditButton,
  DeleteButton,
  PaginationWrapper,
  PaginationButton,
} from '@/styles/metrics.styles';
import Modal from '@/components/modalDelete';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch, faChartLine, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface Metric {
  _id?: string;
  tenantId?: string | null;
  name: string;
  value: number;
  date: string;
}

interface NotificationType {
  message: string;
  type: 'success' | 'error';
}

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
}

const MetricsPage = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [name, setName] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [editingMetric, setEditingMetric] = useState<Metric | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metricToDelete, setMetricToDelete] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'analyst' | 'viewer' | null>(null);

  const itemsPerPage = 5;

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const loadMetrics = useCallback(async () => {
  try {
    const res = await api.get<Metric[]>('/metrics');
    setMetrics(res.data);
  } catch {
    setMetrics([]);
    showNotification('Error al cargar métricas', 'error');
    }
  }, []);

  const loadUserRole = useCallback(async () => {
    try {
      const res = await api.get<UserProfile>('/users/me');
      setUserRole(res.data.role);
    } catch {
      showNotification('Error al obtener perfil de usuario', 'error');
    }
  }, []);

  useEffect(() => {
    loadMetrics();
    loadUserRole();
  }, [loadMetrics, loadUserRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMetric && editingMetric._id) {
        await api.put(`/metrics/${editingMetric._id}`, {
          name,
          value: Number(value),
          date,
        });
        showNotification('Métrica actualizada', 'success');
      } else {
        await api.post('/metrics', { name, value: Number(value), date });
        showNotification('Métrica creada', 'success');
      }
      setName('');
      setValue('');
      setDate('');
      setEditingMetric(null);
      loadMetrics();
    } catch {
      showNotification('Error al guardar métrica', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditingMetric(null);
    setName('');
    setValue('');
    setDate('');
  };

  const handleEditClick = (metric: Metric) => {
    setEditingMetric(metric);
    setName(metric.name);
    setValue(metric.value);
    setDate(metric.date.slice(0, 10));
  };

  const handleDeleteClick = (id: string) => {
    setMetricToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!metricToDelete) return;

    try {
      await api.delete(`/metrics/${metricToDelete}`);
      showNotification('Métrica eliminada', 'success');
      loadMetrics();
    } catch {
      showNotification('Error al eliminar métrica', 'error');
    } finally {
      setIsModalOpen(false);
      setMetricToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setMetricToDelete(null);
  };

  const filteredMetrics = useMemo(() => {
    return Array.isArray(metrics)
      ? metrics.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()))
      : [];
  }, [metrics, search]);
  const totalPages = Math.ceil(filteredMetrics.length / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [filteredMetrics, currentPage, totalPages]);

  const displayedMetrics = filteredMetrics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <MetricsContainer>
      <MetricsHeader>
        <h1>Métricas</h1>
        <form aria-label='metrics-form' onSubmit={handleSubmit}>
          <FormRow>
            <LabelWrapper>
              <Label htmlFor='metric-name'>Nombre</Label>
              <Input
                id='metric-name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre de la métrica"
                required
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label htmlFor='metric-value'>Valor</Label>
              <Input
                id='metric-value'
                type="number"
                value={value}
                onChange={(e) =>
                  setValue(e.target.value === '' ? '' : Number(e.target.value))
                }
                placeholder="Valor de la métrica"
                min="0"
                step="0.01"
                required
              />
            </LabelWrapper>
            <LabelWrapper>
              <Label htmlFor='metric-date'>Fecha</Label>
              <Input
                id='metric-date'
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </LabelWrapper>
          </FormRow>
          <ButtonRow>
            <CreateButton type="submit" editing={!!editingMetric}>
              <FontAwesomeIcon icon={faChartLine} /> {editingMetric ? 'Actualizar Métrica' : 'Crear Métrica'}
            </CreateButton>
            {editingMetric && (
              <CancelButton type="button" onClick={handleCancelEdit}>
                <FontAwesomeIcon icon={faTimes} /> Cancelar
              </CancelButton>
            )}
          </ButtonRow>
        </form>
        <SearchRow>
          <SearchInputWrapper>
            <Input
              placeholder="Buscar métricas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} />
          </SearchInputWrapper>
        </SearchRow>
      </MetricsHeader>
      <TableWrapper>
        <MetricsTable>
          <TableHead>
            <TableRow>
              <TableHeader>Nombre</TableHeader>
              <TableHeader>Valor</TableHeader>
              <TableHeader>Fecha</TableHeader>
              {userRole !== 'viewer' && <TableHeader>Acciones</TableHeader>}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedMetrics.map((metric) => (
              <TableRow key={metric._id}>
                <TableCell>{metric.name}</TableCell>
                <TableCell>{metric.value}</TableCell>
                <TableCell>{formatDate(metric.date)}</TableCell>
                {userRole !== 'viewer' && (
                  <TableCell>
                    <TableActions>
                      <EditButton aria-label={`Editar ${metric.name}`} onClick={() => handleEditClick(metric)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </EditButton>
                      <DeleteButton aria-label={`Eliminar ${metric.name}`} onClick={() => handleDeleteClick(metric._id!)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </DeleteButton>
                    </TableActions>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </MetricsTable>
      </TableWrapper>
      <PaginationWrapper>
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationButton
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </PaginationButton>
        ))}
      </PaginationWrapper>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {isModalOpen && (
        <Modal
          data-testid="delete-modal"
          isOpen={isModalOpen}
          title="Confirmar Eliminación"
          message="¿Desea eliminar este dato? Esta acción es irreversible"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </MetricsContainer>
  );
};

export default MetricsPage;