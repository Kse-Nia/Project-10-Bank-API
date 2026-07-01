import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../config/api"; //

// TS Types for User State
interface UserState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const initialState: UserState = {
  token: localStorage.getItem("token") || null,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
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
        "Erreur: impossible de modifier les données utilisateur",
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
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      //  Login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.error = null;
        localStorage.setItem("token", action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.userInfo = null;
      })
      // Fetch User Profile
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userInfo = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.userInfo = null;
      })
      // Update User Profile Info
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userInfo = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.userInfo = null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
