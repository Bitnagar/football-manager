/* 
    Player slice includes:
    - all player data from the csv file that user uploads.
*/

import { createSlice } from "@reduxjs/toolkit";

const playersSlice = createSlice({
  name: "players",
  initialState: { team: "My team" } as any,
  reducers: {
    // team name reducer
    editTeamName(state, action) {
      state.team = action.payload.teamName;
    },

    /*
      starters = {
        goalkeeper: [{..playerData}]
        defenders: [{..playerData}, {..playerData}, {...}]
        midfielders: [{..playerData}, {..playerData}, {...}]
        forwards: [{..playerData}, {..playerData}, {...}]
      }

      importing confirm
      - create an array of starters only.
      - iterate through array
      - if current player is a goalkeeper, push to starters.goalkeeper
      - if current player is a forward, push to starters.forward
      - if current player is a midfielder, push to starters.midfielder
      - if current player is a defender, push to starters.defender
    */

    // Players data reducers
    addPlayersData(state, action) {
      state["data"] = action.payload.data;
      state["fields"] = action.payload.meta.fields;
    },

    // add starter players to state
    addStarters(state, action) {
      state["starters"] = action.payload;
    },

    editStarters(state, action) {
      state.starters = action.payload;
    },

    editPlayerData(state, action) {
      state.data.forEach((obj: any) => {
        if (obj["Player Image"] === action.payload.uniqueKey) {
          obj["Player Name"] = action.payload.playerName;
          obj["Jersey Number"] = action.payload.jersey;
          obj["Height"] = action.payload.height;
          obj["Weight"] = action.payload.weight;
          obj["Nationality"] = action.payload.nationality;
          obj["Position"] = action.payload.position;
          obj["Starter"] = action.payload.yes === true ? "Yes" : "No";
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

export const {
  addPlayersData,
  editPlayerData,
  deletePlayerData,
  editTeamName,
  addStarters,
  editStarters,
} = playersSlice.actions;
export default playersSlice.reducer;
