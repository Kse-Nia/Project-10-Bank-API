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

// Define a type for the slice state
export interface CounterState {
  value: number
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
}