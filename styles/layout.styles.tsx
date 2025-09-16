import styled from '@emotion/styled';

export const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
`;

export const Main = styled.main`
  margin-top: 2rem;
`;

export const ContentWrapper = styled.div`
  margin-left: 0;

  @media (min-width: 768px) {
    margin-left: 250px;
  }

  @media (max-width: 767px) {
    margin-left: 0;
  }

  transition: margin-left 0.3s ease;
`;