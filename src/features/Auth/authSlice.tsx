/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Slice,
} from '@reduxjs/toolkit';

// Define the User interface
interface User {
  username: string;
  displayname: string;
  usertype: string;
  token: string;
}

// Define the AuthState interface
interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null; // Ensure error is string or null
}

// Initial state for the auth slice
const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Create the login thunk with explicit types for User, arguments, and rejection value
export const login = createAsyncThunk<
  User, // The type of the resolved value from the async function
  { name: string; password: string }, // The type of the argument passed to login
  { rejectValue: string } // The type of the rejection value
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3001/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return {
      username: credentials.name, // Already known from login input
      displayname: data.displayname, // From backend response
      usertype: data.usertype, // From backend response
      token: data.data, // JWT token from backend response
    };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message); // Pass the error message as rejection value
    }
    return rejectWithValue('An unknown error occurred');
  }
});

// Create a new thunk to initialize user from token
export const initializeUser = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>('auth/initializeUser', async (token, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/validate', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return {
      username: data.username,
      displayname: data.displayname,
      usertype: data.usertype,
      token, // The token is already known
    };
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

// Explicitly type the authSlice
const authSlice: Slice<
  AuthState,
  { logout: (state: AuthState) => void },
  'auth'
> = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Logout action to clear user data and remove token from localStorage
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token'); // Remove token from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // handle login
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload; // Save the user data to state
        localStorage.setItem('token', action.payload.token); // Store token in localStorage
        console.log('JWT Token:', action.payload.token); // log token to console
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = 'failed';
          state.error = action.payload ?? 'Failed to login'; // Set the error message, handling undefined
          localStorage.removeItem('token'); // Clear token if login fails
        }
      ) // Handle initializeUser
      .addCase(initializeUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        initializeUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = 'succeeded';
          state.user = action.payload;
        }
      )
      .addCase(
        initializeUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = 'failed';
          state.error = action.payload ?? 'Failed to initialize user';
          localStorage.removeItem('token'); // Clear token if initialization fails
        }
      );
  },
});

// Export the actions and reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
