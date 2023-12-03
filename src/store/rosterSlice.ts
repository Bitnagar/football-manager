import { PlayerStats, RosterData } from "@/types/shared.types";
import { createSlice } from "@reduxjs/toolkit";

const rosterSlice = createSlice({
  name: "rosterData",
  initialState: {
    team: "My Team",
    players: [] as PlayerStats[],
    fields: [] as string[],
    starters: [],
  } as unknown as RosterData,
  reducers: {
    // team name reducer
    editTeamName(state, action) {
      state.team = action.payload.teamName;
    },

    // Players data reducers
    addPlayersData(state, action) {
      state.players = action.payload.data;
      state.fields = action.payload.meta.fields;
    },

    // add starter players to state
    addStarters(state, action) {
      state.starters = action.payload;
    },

    editStarters(state, action) {
      state.starters = action.payload;
    },

    editPlayerData(state, action) {
      state.players.forEach((player: PlayerStats) => {
        if (player["Player Image"] === action.payload.uniqueKey) {
          player["Player Name"] = action.payload.playerName;
          player["Jersey Number"] = action.payload.jersey;
          player["Height"] = action.payload.height;
          player["Weight"] = action.payload.weight;
          player["Nationality"] = action.payload.nationality;
          player["Position"] = action.payload.position;
          player["Starter"] = action.payload.yes === true ? "Yes" : "No";
        }
      });
    },

    deletePlayerData(state, action) {
      let currentPlayerIndex = state.players?.findIndex(
        (player: PlayerStats) =>
          player["Player Image"] === action.payload.uniqueKey
      ) as number;
      state.players?.splice(currentPlayerIndex, 1);
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
} = rosterSlice.actions;
export default rosterSlice.reducer;
