export type PlayerStats = {
  appearances: string;
  assists: string;
  clean_sheets: string;
  flag_image: string;
  goals_: string;
  height: string;
  jersey_number: string;
  minutes_played: string;
  nationality: string;
  player_image: string;
  player_name: string;
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward";
  saves: string;
  starter: string;
  weight: string | "Unknown";
  [key: string]: string;
  uniqueKey: string;
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
