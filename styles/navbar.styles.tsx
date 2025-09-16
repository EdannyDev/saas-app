import styled from '@emotion/styled';
import Link from 'next/link';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #1f2a48;
  color: #fff;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const NavbarBrand = styled(Link)`
  font-weight: bold;
  font-size: 1.25rem;
  text-decoration: none;
  color: #ffd166;

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

export const NavbarToggle = styled.div<{ $open: boolean }>`
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.3s ease;
  transform: ${({ $open }) => ($open ? 'rotate(90deg)' : 'rotate(0deg)')};

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

export const MobileMenu = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 85%;
  right: 1.2rem;
  background-color: #1f2a48;
  border-radius: 8px;
  border: 1px solid #999;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  width: 220px;
  max-height: ${({ $open }) => ($open ? '500px' : '0')};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 480px) {
    width: 90%;
    right: 5%;
    top: 75%;
  }
`;

export const NavbarLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
`;

export const NavbarItem = styled.div<{ $active?: boolean }>`
  padding: 0.75rem 1rem;
  color: ${({ $active }) => ($active ? '#ffd166' : '#fff')};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: '';
    display: ${({ $active }) => ($active ? 'block' : 'none')};
    width: 50%;
    height: 2px;
    background-color: #ffd166;
    position: absolute;
    bottom: 0.5rem;
  }

  svg {
    margin-right: 0.4rem;
    color: ${({ $active }) => ($active ? '#ffd166' : '#fff')};
    transition: color 0.2s ease;
  }

  @media (max-width: 480px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.95rem;

    &::after {
      width: 60%;
      bottom: 0.4rem;
    }

    svg {
      margin-right: 0.3rem;
    }
  }
`;