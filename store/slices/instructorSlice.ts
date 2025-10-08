import { Instructor } from '@/feature/instructor/instructorTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface InstructorState {
  data: Instructor | null
  loggedIn: boolean
}

const initialState: InstructorState = {
  data: null,
  loggedIn: false,
};

const instructorSlice = createSlice({
  name: 'instructor',
  initialState,
  reducers: {
    login(state, action: PayloadAction<Instructor>) {
      state.data = action.payload;
      state.loggedIn = true;
    },
    logout(state) {
      state.data = null;
      state.loggedIn = false;
    },
  },
});

export const { login, logout } = instructorSlice.actions;
export default instructorSlice.reducer;
