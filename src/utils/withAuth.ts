import {
    LOGIN
  } from "../api/resources";
  import { User } from "../api/Schema";
  
  
  export type UserAuthorizationProps = Partial<User>;
  
  export interface PasswordResetProps extends UserAuthorizationProps {
    current_password: string;
    reset_password_token: string;
  }
  
  export type AuthenticationProps = Partial<PasswordResetProps>;
  
  export type SignInResponse = {
    user: Partial<User> | null,
    error: any | null,
    requireReset?: boolean,
    success: boolean,
  }
  
  function handleAuthSuccess(response:any) {
    return response.json().then((user:any) => {
      return { user: user, error: null, success: true };
    });
  }
  
  function handleAuthError(error:any) {
    if (error.response) {
      const user = error.response;
      const resetInfoPresent = user.reset_password_token && user.reset_password_token.length >= 1;
      user.reset_password_token = resetInfoPresent ? user.reset_password_token[0] : null;
      return user.reset_password_token == null ?
        { user: user, error: error.message, success: false } :
        { user: user, error: error.message, success: false, requireReset: true };
    } else {
      return { user: null, error: error.message, success: false };
    }
  }
  
  export async function signIn(props: AuthenticationProps): Promise<SignInResponse> {
    return LOGIN.request('/user/login', { user: props }).then((response:any) => {
      return handleAuthSuccess(response);
    }).catch((error:any) => {
      return handleAuthError(error);
    });
  }
  
  export const withAuthHelpers = () => {
    return {
      signIn
    };
  };
  