import { configureStore } from '@reduxjs/toolkit';

import frameworkSlice from './frameworks/frameworkSlice';

export const store = configureStore({
  reducer: {
    frameworks: frameworkSlice,
  },
});
