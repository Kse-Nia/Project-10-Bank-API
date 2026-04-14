import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../config/api";

// TS Types for User State
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

// User Login
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    const response = await fetch(API_ENDPOINTS.LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue("Email ou mot de passe incorrect");
    }
    const data = await response.json();
    return data.body.token;
  },
);

// Get User Profile
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { user: UserState };
    const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
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
    return data.body;
  },
);

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (profile: { firstName: string; lastName: string }, thunkAPI) => {
    const state = thunkAPI.getState() as { user: UserState };
    const response = await fetch(API_ENDPOINTS.USER_PROFILE, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      return thunkAPI.rejectWithValue(
        "Erreur: mise à jour du profil utilisateur impossible",
      );
    }
    const data = await response.json();
    return data.body;
  },
);

// Slice User State Management
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // LogOut
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
      // Login Success
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        localStorage.setItem("token", action.payload);
      })
      // Login Error
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Fetch User Profile
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Update User Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
