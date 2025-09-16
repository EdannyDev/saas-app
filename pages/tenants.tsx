import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import {
  TenantsContainer,
  TenantsHeader,
  TenantsFormRow,
  TenantsLabelWrapper,
  TenantsLabel,
  TenantsInput,
  TenantsSelect,
  TenantsButtonRow,
  TenantsCreateButton,
  TenantsCancelButton,
  TenantsSearchRow,
  TenantsSearchInputWrapper,
  TenantsTableWrapper,
  TenantsTable,
  TenantsTableHead,
  TenantsTableRow,
  TenantsTableHeader,
  TenantsTableBody,
  TenantsTableCell,
  TenantsTableActions,
  TenantsEditButton,
  TenantsDeleteButton,
  TenantsPaginationWrapper,
  TenantsPaginationButton,
} from '@/styles/tenants.styles';
import Modal from '@/components/modalDelete';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch, faEdit, faTrash, faBuilding } from '@fortawesome/free-solid-svg-icons';

interface Tenant {
  _id?: string;
  name: string;
  plan: 'free' | 'pro';
  createdAt: string;
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

const TenantsPage = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [name, setName] = useState('');
  const [plan, setPlan] = useState<'free' | 'pro'>('free');
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'analyst' | 'viewer' | null>(null);
  const itemsPerPage = 5;

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const loadTenants = useCallback(async () => {
    try {
      const res = await api.get<Tenant[]>('/tenants');
      setTenants(res.data);
    } catch {
      showNotification('Error al cargar tenants', 'error');
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
    loadTenants();
    loadUserRole();
  }, [loadTenants, loadUserRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTenant && editingTenant._id) {
        await api.put(`/tenants/${editingTenant._id}`, { name, plan });
        showNotification('Tenant actualizado', 'success');
      } else {
        await api.post('/tenants', { name, plan });
        showNotification('Tenant creado', 'success');
      }
      setName('');
      setPlan('free');
      setEditingTenant(null);
      loadTenants();
    } catch {
      showNotification('Error al guardar tenant', 'error');
    }
  };

  const handleCancelEdit = () => {
    setEditingTenant(null);
    setName('');
    setPlan('free');
  };

  const handleEditClick = (tenant: Tenant) => {
    setEditingTenant(tenant);
    setName(tenant.name);
    setPlan(tenant.plan);
  };

  const handleDeleteClick = (id: string) => {
    setTenantToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!tenantToDelete) return;
    try {
      await api.delete(`/tenants/${tenantToDelete}`);
      showNotification('Tenant eliminado', 'success');
      loadTenants();
    } catch {
      showNotification('Error al eliminar tenant', 'error');
    } finally {
      setIsModalOpen(false);
      setTenantToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setTenantToDelete(null);
  };

  const filteredTenants = tenants.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.plan.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0) {
      setCurrentPage(1);
    }
  }, [filteredTenants, currentPage, totalPages]);

  const displayedTenants = filteredTenants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <TenantsContainer>
      <TenantsHeader>
        <h1>Empresas / Startups</h1>

        {userRole === 'admin' && (
          <form onSubmit={handleSubmit}>
            <TenantsFormRow>
              <TenantsLabelWrapper>
                <TenantsLabel>Nombre</TenantsLabel>
                <TenantsInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre de la empresa / startup"
                  required
                />
              </TenantsLabelWrapper>
              <TenantsLabelWrapper>
                <TenantsLabel>Plan</TenantsLabel>
                <TenantsSelect
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as 'free' | 'pro')}
                >
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                </TenantsSelect>
              </TenantsLabelWrapper>
            </TenantsFormRow>
            <TenantsButtonRow>
              <TenantsCreateButton type="submit" editing={!!editingTenant}>
                <FontAwesomeIcon icon={faBuilding} /> {editingTenant ? 'Actualizar Empresa / Startup' : 'Crear Empresa / Startup'}
              </TenantsCreateButton>
              {editingTenant && (
                <TenantsCancelButton type="button" onClick={handleCancelEdit}>
                  <FontAwesomeIcon icon={faTimes} /> Cancelar
                </TenantsCancelButton>
              )}
            </TenantsButtonRow>
          </form>
        )}

        <TenantsSearchRow>
          <TenantsSearchInputWrapper>
            <TenantsInput
              placeholder="Buscar empresa / startup..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} />
          </TenantsSearchInputWrapper>
        </TenantsSearchRow>
      </TenantsHeader>

      <TenantsTableWrapper>
        <TenantsTable>
          <TenantsTableHead>
            <TenantsTableRow>
              <TenantsTableHeader>Nombre</TenantsTableHeader>
              <TenantsTableHeader>Plan</TenantsTableHeader>
              <TenantsTableHeader>Creado</TenantsTableHeader>
              {userRole === 'admin' && <TenantsTableHeader>Acciones</TenantsTableHeader>}
            </TenantsTableRow>
          </TenantsTableHead>
          <TenantsTableBody>
            {displayedTenants.map((tenant) => (
              <TenantsTableRow key={tenant._id}>
                <TenantsTableCell>{tenant.name}</TenantsTableCell>
                <TenantsTableCell>{tenant.plan}</TenantsTableCell>
                <TenantsTableCell>{formatDate(tenant.createdAt)}</TenantsTableCell>
                {userRole === 'admin' && (
                  <TenantsTableCell>
                    <TenantsTableActions>
                      <TenantsEditButton data-testid={`edit-tenant-${tenant._id}`} onClick={() => handleEditClick(tenant)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </TenantsEditButton>
                      <TenantsDeleteButton data-testid={`delete-tenant-${tenant._id}`} onClick={() => handleDeleteClick(tenant._id!)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </TenantsDeleteButton>
                    </TenantsTableActions>
                  </TenantsTableCell>
                )}
              </TenantsTableRow>
            ))}
          </TenantsTableBody>
        </TenantsTable>
      </TenantsTableWrapper>

      <TenantsPaginationWrapper>
        {Array.from({ length: totalPages }, (_, i) => (
          <TenantsPaginationButton
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </TenantsPaginationButton>
        ))}
      </TenantsPaginationWrapper>

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
          message="¿Desea eliminar este dato? Esta acción es irreversible"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </TenantsContainer>
  );
};

export default TenantsPage;