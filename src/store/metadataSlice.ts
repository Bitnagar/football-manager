import { PlayerStats } from "@/types/shared.types";
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
      let g = 0,
        d = 0,
        m = 0,
        f = 0,
        s = 0,
        total = action.payload.data.length;
      action.payload.data.forEach((data: PlayerStats) => {
        if (data["starter"] === "Yes") s++;
        if (data["position"] === "Goalkeeper") g++;
        if (data["position"] === "Defender") d++;
        if (data["position"] === "Midfielder") m++;
        if (data["position"] === "Forward") f++;
      });

      state.goalkeepers = g;
      state.defenders = d;
      state.midfielders = m;
      state.forwards = f;
      state.starters = s;
      state.total = total;
    },
    editMetadata: (state, action) => {
      let g = 0,
        d = 0,
        m = 0,
        f = 0,
        s = 0,
        total = action.payload.length;
      action.payload.forEach((Player: PlayerStats) => {
        if (Player["starter"] === "Yes") s++;
        if (Player["position"] === "Goalkeeper") g++;
        if (Player["position"] === "Defender") d++;
        if (Player["position"] === "Midfielder") m++;
        if (Player["position"] === "Forward") f++;
      });
      state.goalkeepers = g;
      state.defenders = d;
      state.midfielders = m;
      state.forwards = f;
      state.starters = s;
      state.total = total;
    },
  },
});

export const { addMetadata, editMetadata } = metadataSlice.actions;
export default metadataSlice.reducer;
