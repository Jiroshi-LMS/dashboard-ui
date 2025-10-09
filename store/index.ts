import { configureStore } from '@reduxjs/toolkit';
import instructorReducer from '@/feature/instructor/slices/instructorSlice';

export const store = configureStore({
  reducer: {
    instructor: instructorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
