import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Modal = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  width: 400px;
  max-width: 90%;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
  animation: slideDown 0.3s ease;

  @keyframes slideDown {
    from { transform: translateY(-20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 1.5rem;
  }
`;

export const IconWrapper = styled.div`
  font-size: 3em;
  color: #ffc107;
  margin-top: 1rem;
  margin-bottom: 1rem;
  animation: pulse 1s infinite;

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  @media (max-width: 480px) {
    font-size: 2.5em;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const Message = styled.p`
  font-size: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ConfirmButton = styled.button`
  flex: 1;
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  transition: background 0.2s;

  &:hover {
    background-color: #a71d2a;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
`;

export const CancelButton = styled.button`
  flex: 1;
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  transition: background 0.2s;

  &:hover {
    background-color: #5a6268;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
`;