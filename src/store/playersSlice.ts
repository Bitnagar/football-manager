/* 
    Player slice includes:
    - all player data from the csv file that user uploads.
*/

import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: {} as any,
  reducers: {
    addPlayersData(state, action) {
      state["data"] = action.payload.data;
      state["fields"] = action.payload.meta.fields;
    },

    editPlayerData(state, action) {
      state.data.forEach((obj: any) => {
        if (obj["Player Image"] === action.payload.uniqueKey) {
          obj["Jersey Number"] = action.payload.jersey;
          obj["Starter"] =
            action.payload.checkboxes.yes === true ? "Yes" : "No";
        }
      });
    },

    deletePlayerData(state, action) {
      let currentPlayerIndex = state.data.findIndex(
        (obj: any) => obj["Player Image"] === action.payload.uniqueKey
      );
      state.data.splice(currentPlayerIndex, 1);
    },
  },
});

export const { addPlayersData, editPlayerData, deletePlayerData } =
  playersSlice.actions;
export default playersSlice.reducer;
