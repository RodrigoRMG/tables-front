import { useState } from 'react';
import { User } from '../api/Schema';
import { USER_SESSION } from '../api/resources';

export type UserAuth = Partial<User>;

export const DEFAULT_USER_AUTH = { id: 0, email: "" };

export const getStoredUserAuth = (): UserAuth => {
  const localAuth = window.localStorage.getItem("UserAuth");
  const auth = localAuth ? localAuth : window.sessionStorage.getItem("UserAuth");
  if (auth) {
    return JSON.parse(auth);
  }
  return DEFAULT_USER_AUTH;
};

export function useAuth(initialState: UserAuth) {
  const [user, setUser] = useState<Partial<User>>(initialState);

  const isAuthenticated = user !== DEFAULT_USER_AUTH;

  const setUserAuthenticated = (auth: UserAuth, remember?: boolean) => {
    remember ? window.localStorage.setItem("UserAuth", JSON.stringify(auth)) :
      window.sessionStorage.setItem("UserAuth", JSON.stringify(auth));
    setUser(auth);
  };

  const unauthenticate = () => {
    const auth = getStoredUserAuth();
    document.cookie = "_now_insurance_api_session= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    USER_SESSION.destroy("logout", { user: auth });
    window.localStorage.clear();
    window.sessionStorage.clear();
    setUser(DEFAULT_USER_AUTH);
  };

  return {
    isAuthenticated,
    user,
    setUserAuthenticated,
    unauthenticate,
  };
}
