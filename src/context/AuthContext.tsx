import React from 'react';
import {
  UserAuth,
  useAuth,
  DEFAULT_USER_AUTH,
  getStoredUserAuth,
} from '../utils/useAuth';

export interface IAuthContextInterface {
  isAuthenticated: boolean;
  user: UserAuth;
  setUserAuthenticated: (userAuth: UserAuth, remember?: boolean) => void;
  unauthenticate: () => void;
}

export const authContext = React.createContext<IAuthContextInterface>({
  isAuthenticated: false,
  user: DEFAULT_USER_AUTH,
  setUserAuthenticated: () => {},
  unauthenticate: () => {},
});

export const useAuthContext = () => React.useContext(authContext);

const { Provider } = authContext;

export const AuthProvider = ({ children }: { children: React.ReactNode, }): JSX.Element => {
  const { isAuthenticated, user, setUserAuthenticated, unauthenticate } = useAuth(getStoredUserAuth());

  return (
    <Provider value={{ isAuthenticated, user, setUserAuthenticated, unauthenticate }}>
      {children}
    </Provider>
  );
};
