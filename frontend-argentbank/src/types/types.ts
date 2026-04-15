export interface UserState {
  token: string | null;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}