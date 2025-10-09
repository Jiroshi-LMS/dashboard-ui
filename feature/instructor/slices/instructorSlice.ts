import { Instructor } from '@/feature/instructor/instructorTypes';
import { fetchInstructorService } from '@/feature/instructor/instructorServices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { standardErrors } from '@/lib/constants/errors';


interface InstructorState {
  data: Instructor | null
  status: "idle" | "loading" | "succeeded" | "failed",
  error: any,
  loggedIn: boolean
}

const initialState: InstructorState = {
  data: null,
  status: "idle",
  error: null,
  loggedIn: false,
};

export const fetchInstructor = createAsyncThunk(
  'instructor/fetch',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      if (state.instructor.loggedIn) return state.instructor.data;
      const resp = await fetchInstructorService();
      if (resp?.status) return resp?.response;
      return rejectWithValue(resp?.msg ?? standardErrors.UNABLE_TO_FETCH + " instructor data");
    } catch (err: any) {
      if (err.message == "TOKEN_EXPIRED") return rejectWithValue(standardErrors.SESSION_EXPIRED)
      return rejectWithValue(err?.response?.data?.msg ?? standardErrors.UNABLE_TO_FETCH + " instructor data");
    }
  }
);

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchInstructor.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchInstructor.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload,
      state.loggedIn = true
    })
    .addCase(fetchInstructor.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
  }
});

export const { logout } = instructorSlice.actions;
export default instructorSlice.reducer;
