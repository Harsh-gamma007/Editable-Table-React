import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import rootReducers from '../features/reducers';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    customer: rootReducers,
  },
});
