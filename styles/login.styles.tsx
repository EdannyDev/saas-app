import styled from '@emotion/styled';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 90%;
  max-width: 400px;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  font-size: 0.85rem;
  color: #000;
  font-weight: 600;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 1rem 0.65rem 2rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.95rem;
  line-height: 1.2;
  transition: border 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0070f3;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1rem 0.75rem 2rem;
    font-size: 1rem;
  }
`;

export const Icon = styled.span`
  position: absolute;
  top: 66%;
  left: 0.5rem;
  transform: translateY(-50%);
  color: #888;
  display: flex;
  align-items: center;
`;

export const TogglePasswordIcon = styled.span`
  position: absolute;
  top: 67%;
  right: 0.6rem;
  transform: translateY(-50%);
  color: #888;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: #333;
  }
`;

export const Button = styled.button`
  padding: 0.65rem 1rem;
  border-radius: 4px;
  border: none;
  background-color: #0070f3;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.95rem;

  &:hover {
    background-color: #005bb5;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
`;

export const RedirectText = styled.p`
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #555;
  text-align: center;

  span {
    color: #0070f3;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContent = styled.div`
  width: 90%;
  max-width: 400px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.5rem;
`;

export const ModalFooter = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const ModalInputWrapper = styled.div`
  position: relative;
`;

export const ModalIcon = styled.span`
  position: absolute;
  top: 50%;
  left: 0.5rem;
  transform: translateY(-50%);
  color: #888;
  display: flex;
  align-items: center;
`;

export const ModalBody = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CancelButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  border: none;
  background-color: #898989;
  color: #fff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #6b6b6b;
  }

  &:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
    padding: 0.7rem 1.5rem;
  }
`;

export const SendButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  border: none;
  background-color: #28a745;
  color: #fff;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #218838;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  @media (min-width: 768px) {
    font-size: 0.9rem;
    padding: 0.7rem 1.5rem;
  }
`;