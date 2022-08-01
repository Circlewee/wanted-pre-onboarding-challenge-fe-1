export interface IUserInfo {
  email: string;
  password: string;
}

export interface IUserRequestSuccess {
  message: string;
  token: string;
}

export interface IRequestError {
  details: string;
}
