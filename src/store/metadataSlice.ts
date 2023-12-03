import { createSlice } from "@reduxjs/toolkit";

const metadataSlice = createSlice({
  name: "metadata",
  initialState: {
    goalkeepers: 0,
    defenders: 0,
    midfielders: 0,
    forwards: 0,
    starters: 0,
    total: 0,
  },
  reducers: {
    addMetadata: (state, action) => {
      return {
        ...state,
        ...action.payload.data,
      };
    },
    editMetadata: (state, action) => {
      return {
        ...state,
        ...action.payload.data,
      };
    },
  },
});

export const { addMetadata, editMetadata } = metadataSlice.actions;
export default metadataSlice.reducer;
