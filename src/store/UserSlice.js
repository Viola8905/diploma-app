import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://2e67-89-171-112-35.ngrok-free.app/api/odata/ApplicationUser?$expand=Roles($select=Name,IsAdministrative),UserSkills($select=Name)",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijk3Y2M2YjA4LWY1Y2YtNGE4MC1hZjJjLTBmMGFiZWIxYmY2YiIsIlhhZlNlY3VyaXR5QXV0aFBhc3NlZCI6IlhhZlNlY3VyaXR5QXV0aFBhc3NlZCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJBZG1pbiIsIlhhZlNlY3VyaXR5IjoiWGFmU2VjdXJpdHkiLCJYYWZMb2dvblBhcmFtcyI6InExWXFMVTR0OGt2TVRWV3lVbkpNeWMzTVU5SlJLa2dzTGk3UEwwb0JDaW5WQWdBPSIsImV4cCI6MTcwODUyNjYxMX0.W7ErDt_uFMd5IMVwhFJ4w495m09Otma1gofp8v4XseU",
          "ngrok-skip-browser-warning": "any",
        },
      };

      const response = await axios.request(config);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

const initialState = {
  loading: false,
  user: null,
  error: null,
  isAuthenticated: false,
  userRole: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          Oid: action.payload.Oid,
          UserName: action.payload.UserName,
          ProfilePicture: action.payload.ProfilePicture,
          Roles: action.payload.Roles,
          UserSkills: action.payload.UserSkills,
        };
        state.isAuthenticated = true;
        state.userRole = action.payload.Roles[0];
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
      });
  },
});

export const { actions, reducer } = userSlice;

export default reducer;
