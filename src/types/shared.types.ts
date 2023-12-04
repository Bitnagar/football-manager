export type PlayerStats = {
  Appearances: string;
  Assists: string;
  "Clean Sheets": string | number;
  "Flag Image": string;
  "Goals ": string;
  Height: string;
  "Jersey Number": string;
  "Minutes Played": string;
  Nationality: string;
  "Player Image": string;
  "Player Name": string;
  Position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  Saves: string;
  Starter: string;
  Weight: string | "Unknown";
};

export type RosterData = {
  team: string;
  players: Array<PlayerStats>;
  fields: string[];
  starters: Starters;
};

export type MetaData = {
  metadata: {
    goalkeepers: number;
    defenders: number;
    midfielders: number;
    forwards: number;
    starters: number;
    total: number;
  };
};

export type Starters = {
  goalkeeper: PlayerStats[];
  defenders: PlayerStats[];
  midfielders: PlayerStats[];
  forwards: PlayerStats[];
};
