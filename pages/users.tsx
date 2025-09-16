import { useState, useEffect, useCallback } from 'react';
import api from '@/lib/api';
import {
  UsersContainer,
  UsersHeader,
  UsersFormRow,
  UsersLabelWrapper,
  UsersLabel,
  UsersInput,
  UsersSelect,
  UsersButtonRow,
  UserUpdateButton,
  UsersCancelButton,
  UsersSearchRow,
  UsersSearchInputWrapper,
  UsersTableWrapper,
  UsersTable,
  UsersTableHead,
  UsersTableRow,
  UsersTableHeader,
  UsersTableBody,
  UsersTableCell,
  UsersTableActions,
  UsersEditButton,
  UsersDeleteButton,
  UsersPaginationWrapper,
  UsersPaginationButton,
} from '@/styles/users.styles';
import Modal from '@/components/modalDelete';
import Notification from '@/components/notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSearch, faEdit, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';

interface User {
  _id?: string;
  name: string;
  email: string;
  role: 'admin' | 'analyst' | 'viewer';
  createdAt: string;
}

interface NotificationType {
  message: string;
  type: 'success' | 'error';
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [notification, setNotification] = useState<NotificationType | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'analyst' | 'viewer'>('viewer');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const itemsPerPage = 5;

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
  };

  const loadUsers = useCallback(async () => {
    try {
      const res = await api.get<User[]>('/users/list');
      setUsers(res.data);
    } catch {
      showNotification('Error al cargar usuarios', 'error');
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser || !editingUser._id) return;

    try {
      await api.put(`/users/update/${editingUser._id}`, { name, email, role });
      showNotification('Usuario actualizado', 'success');
      resetForm();
      loadUsers();
    } catch {
      showNotification('Error al actualizar usuario', 'error');
    }
  };

  const handleEditClick = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
  };

  const handleCancelEdit = () => resetForm();

  const resetForm = () => {
    setEditingUser(null);
    setName('');
    setEmail('');
    setRole('viewer');
  };

  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await api.delete(`/users/delete/${userToDelete}`);
      showNotification('Usuario eliminado', 'success');
      loadUsers();
    } catch {
      showNotification('Error al eliminar usuario', 'error');
    } finally {
      setIsModalOpen(false);
      setUserToDelete(null);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setUserToDelete(null);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
    else if (totalPages === 0) setCurrentPage(1);
  }, [filteredUsers, currentPage, totalPages]);

  const displayedUsers = filteredUsers.slice(
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
    <UsersContainer>
      <UsersHeader>
        <h1>Usuarios</h1>

        {editingUser && (
          <form onSubmit={handleSubmit}>
            <UsersFormRow>
              <UsersLabelWrapper>
                <UsersLabel>Nombre</UsersLabel>
                <UsersInput
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre del usuario"
                  required
                />
              </UsersLabelWrapper>
              <UsersLabelWrapper>
                <UsersLabel>Email</UsersLabel>
                <UsersInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email del usuario"
                  required
                />
              </UsersLabelWrapper>
              <UsersLabelWrapper>
                <UsersLabel>Rol</UsersLabel>
                <UsersSelect
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'analyst' | 'viewer')}
                >
                  <option value="admin">Admin</option>
                  <option value="analyst">Analyst</option>
                  <option value="viewer">Viewer</option>
                </UsersSelect>
              </UsersLabelWrapper>
            </UsersFormRow>
            <UsersButtonRow>
                <UserUpdateButton type="submit">
                    <FontAwesomeIcon icon={faUserEdit} /> Actualizar Usuario
                </UserUpdateButton>
                <UsersCancelButton type="button" onClick={handleCancelEdit}>
                    <FontAwesomeIcon icon={faTimes} /> Cancelar
                </UsersCancelButton>
            </UsersButtonRow>
          </form>
        )}

        <UsersSearchRow>
          <UsersSearchInputWrapper>
            <UsersInput
              placeholder="Buscar usuarios..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} />
          </UsersSearchInputWrapper>
        </UsersSearchRow>
      </UsersHeader>

      <UsersTableWrapper>
        <UsersTable>
          <UsersTableHead>
            <UsersTableRow>
              <UsersTableHeader>Nombre</UsersTableHeader>
              <UsersTableHeader>Email</UsersTableHeader>
              <UsersTableHeader>Rol</UsersTableHeader>
              <UsersTableHeader>Creado</UsersTableHeader>
              <UsersTableHeader>Acciones</UsersTableHeader>
            </UsersTableRow>
          </UsersTableHead>
          <UsersTableBody>
            {displayedUsers.map((user) => (
              <UsersTableRow key={user._id}>
                <UsersTableCell>{user.name}</UsersTableCell>
                <UsersTableCell>{user.email}</UsersTableCell>
                <UsersTableCell>{user.role}</UsersTableCell>
                <UsersTableCell>{formatDate(user.createdAt)}</UsersTableCell>
                <UsersTableCell>
                  <UsersTableActions>
                    <UsersEditButton data-testid={`edit-${user._id}`} onClick={() => handleEditClick(user)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </UsersEditButton>
                    <UsersDeleteButton data-testid={`delete-${user._id}`} onClick={() => handleDeleteClick(user._id!)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </UsersDeleteButton>
                  </UsersTableActions>
                </UsersTableCell>
              </UsersTableRow>
            ))}
          </UsersTableBody>
        </UsersTable>
      </UsersTableWrapper>

      <UsersPaginationWrapper>
        {Array.from({ length: totalPages }, (_, i) => (
          <UsersPaginationButton
            key={i}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </UsersPaginationButton>
        ))}
      </UsersPaginationWrapper>

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
    </UsersContainer>
  );
};

export default UsersPage;