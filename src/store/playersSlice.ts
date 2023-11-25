/* 
    Player slice includes:
    - all player data from the csv file that user uploads.
*/

import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: { data: null },
  reducers: {
    addPlayersData(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addPlayersData } = playersSlice.actions;
export default playersSlice.reducer;
