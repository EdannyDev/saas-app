import styled from '@emotion/styled';

export const ProfileContainer = styled.div`
  padding: 0;
`;

export const ProfileHeader = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`;

export const ProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProfileFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileLabel = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ProfileInputRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

export const ProfileInputWrapper = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  width: ${(props) => props.width || '500px'};

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const InputIcon = styled.div`
  position: absolute;
  left: 10px;
  color: #888;
  pointer-events: none;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const TogglePasswordIcon = styled.div`
  position: absolute;
  right: 10px;
  color: #555;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #000;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ProfileInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 0.75rem 0 2.2rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ProfileDescription = styled.span`
  font-size: 1.1rem;
  color: #555;
  margin-left: 1rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    margin-left: 0;
    font-size: 0.95rem;
    white-space: normal;
  }
`;

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 0.5rem 0;
`;

export const ProfileButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const ProfileUpdateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1.5rem;
  border-radius: 6px;
  border: none;
  background-color: #ffc107;
  color: #000;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0a800;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
`;

export const ProfileDeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1rem;
  border-radius: 6px;
  border: none;
  background-color: #dc3545;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #a71d2a;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.6rem 0.9rem;
  }
`;