import styled from '@emotion/styled';

export const TenantsContainer = styled.div`
  padding: 0;
`;

export const TenantsHeader = styled.div`
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

export const TenantsFormRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: flex-start;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const TenantsLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;

  @media (max-width: 600px) {
    min-width: 100%;
  }
`;

export const TenantsLabel = styled.label`
  font-weight: 600;
  margin-bottom: 0.3rem;
  text-align: left;
`;

export const TenantsInput = styled.input`
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

export const TenantsSelect = styled.select`
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

export const TenantsButtonRow = styled.div`
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

export const TenantsCreateButton = styled.button<{ editing?: boolean }>`
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  border: none;
  background-color: ${(props) => (props.editing ? '#ffc107' : '#28a745')};
  color: ${(props) => (props.editing ? '#000' : '#fff')};
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: ${(props) => (props.editing ? '#e0a800' : '#218838')};
  }
`;

export const TenantsCancelButton = styled.button`
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

export const TenantsSearchRow = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    justify-content: stretch;
  }
`;

export const TenantsSearchInputWrapper = styled.div`
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

export const TenantsTableWrapper = styled.div`
  overflow-x: auto;
`;

export const TenantsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 8px;
  overflow: hidden;
`;

export const TenantsTableHeader = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
`;

export const TenantsTableHead = styled.thead`
  background-color: #c0c4c8;
`;

export const TenantsTableBody = styled.tbody`
  tr:nth-of-type(odd) {
    background-color: #e8eaed;
  }

  tr:nth-of-type(even) {
    background-color: #f4f5f6;
  }
`;

export const TenantsTableCell = styled.td`
  padding: 0.75rem 1rem;
`;

export const TenantsTableRow = styled.tr``;

export const TenantsTableActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TenantsEditButton = styled.button`
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

export const TenantsDeleteButton = styled.button`
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

export const TenantsPaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const TenantsPaginationButton = styled.button<{ active?: boolean }>`
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