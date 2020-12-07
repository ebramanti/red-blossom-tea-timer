import { Duration } from "luxon";

export type TeaType = "oolong" | "all-products";

export interface Tea {
  name: string;
  baseHref: string;
}

export interface BrewInstructions {
  type: string;
  leafAmount: string;
  temperature: string;
  duration?: Duration;
}

export interface TeaInfo {
  name: string;
  description: string;
  brewingInfo: BrewInstructions[];
}
