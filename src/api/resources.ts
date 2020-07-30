import API from "./Wrapper";
const api = (API as any);


export const LOGIN = api['user/login'];
export const USER_SESSION = api.user;
export const PASSWORD = api['user/password'];