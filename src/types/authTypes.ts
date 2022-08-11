export interface AuthData {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
}

export interface ErrorResponse {
  details: string;
}

export type AuthRequest = (userInfo: AuthData) => Promise<AuthResponse>;
