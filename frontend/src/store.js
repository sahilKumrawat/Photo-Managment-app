import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../src/currentUserSlice'

export default configureStore({
  reducer: {
    currentUser : currentUserReducer,
  },
});