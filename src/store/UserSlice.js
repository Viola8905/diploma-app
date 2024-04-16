import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://localhost:7271/login",
        {
          email: userCredentials.email,
          password: userCredentials.password,
          twoFactorCode: "string",
          twoFactorRecoveryCode: "string",
        },
        {
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
        }
      );
      console.log(response.data)
      return response; // Assuming you want to return the response data directly
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If the error is an Axios error, you can access the response directly
        return rejectWithValue(
          error.response ? error.response.data : "An unknown error occurred"
        );
      } else {
        // For non-Axios errors, you might want to handle them differently
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://localhost:7271/register",
        {
          email: userCredentials.email,
          password: userCredentials.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return response; // Assuming you want to return the response data directly
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If the error is an Axios error, you can access the response directly
        return rejectWithValue(
          error.response ? error.response.data : "An unknown error occurred"
        );
      } else {
        // For non-Axios errors, you might want to handle them differently
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const initialState = {
  loading: false,
  user: "no data",
  error: null,
  isAuthenticated: false,
  userRole: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      // Reset the state to initial state or a logged out state
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if (action.error.message == "Rejected") {
          state.error = "Acces Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if (action.error.message == "Rejected") {
          state.error = "Acces Denied! Invalid Credentials";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

// Export the logout action creator
export const { logout } = userSlice.actions;
export const { actions, reducer } = userSlice;

export default reducer;
