import styled from '@emotion/styled';

export const RegisterContainer = styled.div`
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

export const RegisterForm = styled.form`
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

export const Tooltip = styled.span`
  position: absolute;
  bottom: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-0.5rem);
  padding: 0.35rem 0.5rem;
  font-size: 0.7rem;
  background-color: rgba(0,0,0,0.75);
  color: #fff;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 4px;
    border-style: solid;
    border-color: rgba(0,0,0,0.75) transparent transparent transparent;
  }

  @media (min-width: 768px) {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
    &::after {
      border-width: 5px;
    }
  }
`;

export const InputWrapper = styled.div`
  position: relative;

  &.tooltip-visible .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-0.75rem);
    pointer-events: none;
  }
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
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005bb5;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 1rem;
    font-size: 1rem;
  }
`;

export const RedirectText = styled.p`
  margin-top: 0.3rem;
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