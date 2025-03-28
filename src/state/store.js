import { configureStore } from '@reduxjs/toolkit';

import listingsReducer from '@/state/slices/listingsSlice';

const store = configureStore({
  reducer: {
    listings: listingsReducer,
  },
});

export default store;
