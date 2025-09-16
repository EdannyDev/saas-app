import styled from '@emotion/styled';

export const ToastContainer = styled.div<{ type: 'success' | 'error' }>`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 90%;
  padding: 1rem 1.5rem;
  background-color: ${({ type }) => (type === 'success' ? '#28a745' : '#dc3545')};
  color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  animation: slideDown 0.3s ease forwards;

  @keyframes slideDown {
    from { opacity: 0; transform: translate(-50%, -20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }

  @media (max-width: 480px) {
    min-width: 200px;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  @media (min-width: 481px) and (max-width: 768px) {
    min-width: 250px;
    padding: 0.9rem 1.25rem;
    font-size: 0.95rem;
  }

  @media (min-width: 1200px) {
    max-width: 400px;
  }
`;

export const ToastIcon = styled.span`
  margin-right: 0.75rem;
  font-size: 1.2rem;

  @media (max-width: 480px) {
    font-size: 1rem;
    margin-right: 0.5rem;
  }
`;

export const ToastMessage = styled.span`
  flex: 1;
  font-size: 1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

export const ToastClose = styled.button`
  margin-left: 0.6rem;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    opacity: 0.8;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-left: 0.4rem;
  }
`;