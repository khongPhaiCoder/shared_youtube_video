export interface LoginFormProps {}

export type Inputs = {
  email: string;
  password: string;
};

export type Response = {
  accessToken: string;
  user: {
    _id: string;
    username: string;
    email: string;
  };
};
