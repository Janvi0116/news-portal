import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    news: newsReducer,
    ui: uiReducer,
  },
});

export default store;