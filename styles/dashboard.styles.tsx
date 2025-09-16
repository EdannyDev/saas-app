import styled from "@emotion/styled";

export const DashboardContainer = styled.div`
  padding: 0;

  @media (min-width: 768px) {
    padding: 2rem 3rem;
  }

  @media (min-width: 1200px) {
    padding: 3rem 5rem;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;

  h1 {
    font-size: 1.8rem;
    margin-top: 0.5rem;
    color: #222;

    @media (min-width: 768px) {
      font-size: 2rem;
    }

    @media (min-width: 1200px) {
      font-size: 2.2rem;
    }
  }
`;

export const UserCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 1.5rem;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }

  @media (min-width: 1200px) {
    width: 100px;
    height: 100px;
    font-size: 2.5rem;
  }
`;

export const InfoRow = styled.div`
  margin: 0.4rem 0;
  font-size: 0.9rem;
  color: #555;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1200px) {
    font-size: 1.1rem;
  }
`;

export const InfoTextWithIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
`;

export const WelcomeMessage = styled.div`
  text-align: center;
  margin-top: 0.5rem;

  p {
    font-size: 1rem;
    color: #444;
    line-height: 1.4;

    @media (min-width: 768px) {
      font-size: 1.1rem;
      line-height: 1.5;
    }

    @media (min-width: 1200px) {
      font-size: 1.2rem;
      line-height: 1.6;
    }
  }
`;