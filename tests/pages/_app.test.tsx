import { render, screen, waitFor } from '@testing-library/react';
import MyApp from '@/pages/_app';
import api from '@/lib/api';
import { useRouter } from 'next/router';
import type { Router } from 'next/router';

jest.mock('@/lib/api');
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/components/sidebar', () => {
  const SidebarMock = () => <div>Sidebar Mock</div>;
  SidebarMock.displayName = 'SidebarMock';
  return SidebarMock;
});

jest.mock('@/components/navbar', () => {
  const NavbarMock = () => <div>Navbar Mock</div>;
  NavbarMock.displayName = 'NavbarMock';
  return NavbarMock;
});

describe('MyApp', () => {
  const mockReplace = jest.fn();

  const dummyRouter: Partial<Router> = {
    pathname: '/',
    route: '/',
    asPath: '/',
    basePath: '',
    isLocaleDomain: false,
    isReady: true,
    query: {},
    locale: undefined,
    locales: undefined,
    push: jest.fn(),
    replace: mockReplace,
    prefetch: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn() as Router['events']['on'],
      off: jest.fn() as Router['events']['off'],
      emit: jest.fn() as Router['events']['emit'],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useRouter as jest.Mock).mockReturnValue(dummyRouter);

    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url === '/users/me') {
        return Promise.resolve({ data: { role: 'admin' } });
      }
      return Promise.resolve({});
    });
  });

  it('renderiza Layout y Component en páginas con layout', async () => {
    const DummyComponent = () => <div>Home Page</div>;

    render(
      <MyApp
        Component={DummyComponent}
        pageProps={{}}
        router={dummyRouter as unknown as Router}
      />
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.getByText('Sidebar Mock')).toBeInTheDocument();
    expect(screen.getByText('Navbar Mock')).toBeInTheDocument();
  });

  it('no renderiza Layout en páginas sin layout', async () => {
    const DummyComponent = () => <div>Login Page</div>;
    const loginRouter = { ...dummyRouter, pathname: '/login' } as unknown as Router;
    (useRouter as jest.Mock).mockReturnValue(loginRouter);

    render(<MyApp Component={DummyComponent} pageProps={{}} router={loginRouter} />);

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Sidebar Mock')).not.toBeInTheDocument();
    expect(screen.queryByText('Navbar Mock')).not.toBeInTheDocument();
  });

  it('redirecciona a /login si api.get falla', async () => {
    const DummyComponent = () => <div>Protected Page</div>;

    (api.get as jest.Mock).mockRejectedValueOnce(new Error('Unauthorized'));

    render(
      <MyApp
        Component={DummyComponent}
        pageProps={{}}
        router={dummyRouter as unknown as Router}
      />
    );

    await waitFor(() => {
      expect(dummyRouter.replace).toHaveBeenCalledWith('/login');
    });
  });

  it('no redirecciona si api.get es exitoso', async () => {
    const DummyComponent = () => <div>Protected Page</div>;

    (api.get as jest.Mock).mockResolvedValueOnce({ data: { role: 'admin' } });

    render(
      <MyApp
        Component={DummyComponent}
        pageProps={{}}
        router={dummyRouter as unknown as Router}
      />
    );

    expect(dummyRouter.replace).not.toHaveBeenCalled();
    expect(screen.getByText('Protected Page')).toBeInTheDocument();
  });
});