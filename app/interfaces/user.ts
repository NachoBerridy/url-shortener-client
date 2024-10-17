export interface userSignup {
  email: string;
  password: string;
  full_name: string;
  username: string;
}

export interface userLogin {
  username: string;
  password: string;
}

export type User = {
  username: string;
  password: string;
  full_name: string;
  email: string;
  id: number;
}

export type token = {
  token: string;
}

export interface ISession {
  auth_token?: string;
  user?: User;
}

export interface dashboardLoader {
  session: ISession;
  api: string;
}