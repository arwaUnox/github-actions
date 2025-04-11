import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import api from "@/api";
const initialState = {
  listings: [],
  favouriteListingIds: [],
  error: null,
  status: "idle",
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      state.favouriteListingIds.push(action.payload);
    },
    removeFromFavorite: (state, action) => {
      state.favouriteListingIds = state.favouriteListingIds.filter(
        (id) => id !== action.payload,
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        if (axios.isCancel(action.payload)) {
          return;
        }
        state.status = "failed";
      });
  },
});

export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (options) => {
    const response = await api.get("/api/listings", options);
    console.log("response", response);
    return response.data;
  },
);
export const { addToFavorite, removeFromFavorite } = listingsSlice.actions;
export default listingsSlice.reducer;
