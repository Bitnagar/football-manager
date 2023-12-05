import { PlayerStats, RosterData, Starters } from "@/types/shared.types";
import { createSlice } from "@reduxjs/toolkit";

const rosterSlice = createSlice({
  name: "rosterData",
  initialState: {
    team: "My Team",
    players: [],
    fields: [],
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
      let starters = {
        goalkeeper: [],
        defenders: [],
        midfielders: [],
        forwards: [],
      } as Starters;
      action.payload.data.forEach((player: PlayerStats) => {
        if (player["starter"] === "Yes") {
          switch (player["position"]) {
            case "Goalkeeper":
              starters.goalkeeper.push(player);
              break;
            case "Defender":
              starters.defenders.push(player);
              break;
            case "Midfielder":
              starters.midfielders.push(player);
              break;
            case "Forward":
              starters.forwards.push(player);
              break;
            default:
              break;
          }
        }
      });
      state.starters = starters;
    },

    // edit starters
    editStarters(state, action) {
      let starters = {
        goalkeeper: [],
        defenders: [],
        midfielders: [],
        forwards: [],
      } as Starters;
      action.payload.forEach((player: PlayerStats) => {
        if (player["starter"] === "Yes") {
          switch (player["position"]) {
            case "Goalkeeper":
              starters.goalkeeper.push(player);
              break;
            case "Defender":
              starters.defenders.push(player);
              break;
            case "Midfielder":
              starters.midfielders.push(player);
              break;
            case "Forward":
              starters.forwards.push(player);
              break;

            default:
              break;
          }
        }
      });
      state.starters = starters;
    },

    editPlayerData(state, action) {
      state.players.forEach((player: PlayerStats) => {
        if (player["uniqueKey"] === action.payload.uniqueKey) {
          player["player_name"] = action.payload.playerName;
          player["jersey_number"] = action.payload.jersey;
          player["height"] = action.payload.height;
          player["weight"] = action.payload.weight;
          player["nationality"] = action.payload.nationality;
          player["position"] = action.payload.position;
          player["starter"] = action.payload.yes === true ? "Yes" : "No";
        }
      });
    },

    deletePlayerData(state, action) {
      let currentPlayerIndex = state.players?.findIndex(
        (player: PlayerStats) =>
          player["uniqueKey"] === action.payload.uniqueKey
      ) as number;
      state.players.splice(currentPlayerIndex, 1);
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
