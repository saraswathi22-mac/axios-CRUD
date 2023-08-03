import { configureStore } from '@reduxjs/toolkit';
import { bookSlice } from './bookSlice';
import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
    user: userSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export type AppDispatch = typeof store.dispatch; 