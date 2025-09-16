import styled from '@emotion/styled';
import Link from 'next/link';

export const SidebarContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 250px;
    min-height: 100vh;
    background-color: #1f2a48;
    color: #fff;
    border-right: 1px solid #333;
    padding: 2rem 1rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
`;

export const SidebarHeader = styled(Link)`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #ffd166;
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const SidebarMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

export const SidebarMenuItem = styled.li`
  margin-bottom: 1rem;
`;

export const SidebarSeparator = styled.hr`
  border: none;
  border-top: 1px solid #888;
  margin: 1.5rem 0;
`;

export const SidebarLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== '$active',
})<{ $active?: boolean }>`
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.2s;
  background-color: ${({ $active }) => ($active ? '#2a3a5a' : 'transparent')};

  &:hover {
    background-color: #2a3a5a;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

export const SidebarButton = styled.button`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff;
  background-color: transparent;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #2a3a5a;
  }

  svg {
    margin-right: 0.5rem;
  }
`;