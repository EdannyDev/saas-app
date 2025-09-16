import { ReactNode } from 'react';
import Sidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { Container, Main, ContentWrapper } from '../styles/layout.styles';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Sidebar />
      <Navbar />
      <Container>
        <Main>
          <ContentWrapper>{children}</ContentWrapper>
        </Main>
      </Container>
    </>
  );
};

export default Layout;