import styled from '@emotion/styled';

export const UsersContainer = styled.div`
  padding: 0;
`;

export const UsersHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    h1 {
      font-size: 1.5rem;
    }
  }
`;

export const UsersFormRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const UsersLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;

  @media (max-width: 600px) {
    min-width: 100%;
  }
`;

export const UsersLabel = styled.label`
  font-weight: 600;
  margin-bottom: 0.3rem;
  text-align: left;
`;

export const UsersInput = styled.input`
  width: 220px;
  height: 40px;
  padding: 0 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const UsersSelect = styled.select`
  width: 220px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid #ccc;
  padding: 0 0.75rem;
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const UsersButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const UserUpdateButton = styled.button`
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  border: none;
  background-color: #ffc107;
  color: #000;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #e0a800;
  }
`;

export const UsersCancelButton = styled.button`
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border: none;
  background-color: #6c757d;
  color: #fff;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #5a6268;
  }
`;

export const UsersSearchRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    justify-content: stretch;
  }
`;

export const UsersSearchInputWrapper = styled.div`
  position: relative;
  width: 250px;

  svg {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
  }

  input {
    width: 100%;
    padding-right: 2rem;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const UsersTableWrapper = styled.div`
  overflow-x: auto;
`;

export const UsersTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
`;

export const UsersTableHeader = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
`;

export const UsersTableHead = styled.thead`
  background-color: #c0c4c8;
`;

export const UsersTableBody = styled.tbody`
  tr:nth-of-type(odd) {
    background-color: #e8eaed;
  }

  tr:nth-of-type(even) {
    background-color: #f4f5f6;
  }
`;

export const UsersTableCell = styled.td`
  padding: 0.75rem 1rem;
`;

export const UsersTableRow = styled.tr``;

export const UsersTableActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const UsersEditButton = styled.button`
  border: none;
  background: none;
  color: #ffc107;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;

  &:hover {
    color: #e0a800;
  }
`;

export const UsersDeleteButton = styled.button`
  border: none;
  background: none;
  color: #dc3545;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;

  &:hover {
    color: #a71d2a;
  }
`;

export const UsersPaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const UsersPaginationButton = styled.button<{ active?: boolean }>`
  padding: 0.4rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #0070f3;
  background-color: ${(props) => (props.active ? '#0070f3' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#0070f3')};
  cursor: pointer;

  &:hover {
    background-color: #005bb5;
    color: white;
  }
`;