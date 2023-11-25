/* 
    Metadata includes:
    - file summary data
    - number of starters
*/

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
    addMetadata(state, action) {
      state.defenders = action.payload.data.defenders;
      state.goalkeepers = action.payload.data.goalkeepers;
      state.midfielders = action.payload.data.midfielders;
      state.forwards = action.payload.data.forwards;
      state.starters = action.payload.data.starters;
      state.total = action.payload.data.total;
    },
  },
});

export const { addMetadata } = metadataSlice.actions;
export default metadataSlice.reducer;
