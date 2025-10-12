import { Instructor } from '@/feature/instructor/instructorTypes';
import { fetchInstructorService } from '@/feature/instructor/instructorServices';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
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

const fetchInstructorVendor = async () => {
  try {
    const resp = await fetchInstructorService();
    if (resp?.status) return resp?.response;
    throw new Error(resp?.msg ?? standardErrors.UNABLE_TO_FETCH + " instructor data");
  } catch (err: any) {
    if (err.message == standardErrors.TOKEN_EXPIRED) throw new Error (standardErrors.SESSION_EXPIRED)
    throw new Error(err?.response?.data?.msg ?? standardErrors.UNABLE_TO_FETCH + " instructor data");
  }
}

export const fetchInstructor = createAsyncThunk(
  'instructor/fetch',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      if (state.instructor.loggedIn) return state.instructor.data;
      return await fetchInstructorVendor();
    } catch (err: any) {
      return rejectWithValue(err?.message ?? standardErrors.UNABLE_TO_FETCH + " instructor data");
    }
  }
);

export const fetchInstructorStrict = createAsyncThunk(
  'instructor/fetchStrict',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchInstructorVendor();
    } catch (err: any) {
      return rejectWithValue(err?.message ?? standardErrors.UNABLE_TO_FETCH + " instructor data");
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
    .addCase(fetchInstructorStrict.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(fetchInstructorStrict.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload,
      state.loggedIn = true
    })
    .addCase(fetchInstructorStrict.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    })
  }
});

export const { logout } = instructorSlice.actions;
export default instructorSlice.reducer;
