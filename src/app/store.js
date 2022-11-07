import { configureStore } from '@reduxjs/toolkit';
import rootReducers from '../features/reducers';

export const store = configureStore({
  reducer: {
    customer: rootReducers,
  },
});
