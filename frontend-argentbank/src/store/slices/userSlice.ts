import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Type for the slice state
interface UserState {
  token: string | null;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || null,
  userInfo: null,
  isLoading: false,
  error: null,
};

// User login
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    const response = await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Email ou mot de passe incorrect");
    }
    const data = await response.json();
    return data.body.token; // le JWT
  },
);

// Get User Profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { user: UserState };
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Impossible de récupérer le profil");
    }
    const data = await response.json();
    return data.body; // Return user info
  },
);

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (profile: { firstName: string; lastName: string }, thunkAPI) => {
    const state = thunkAPI.getState() as { user: UserState };
    const response = await fetch("http://localhost:3001/api/v1/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        "Erreur - Impossible de mettre à jour le profil",
      );
    }
    const data = await response.json();
    return data.body;
  },
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Logout
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      //  Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch User Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      // Update User
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
