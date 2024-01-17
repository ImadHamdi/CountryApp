import { Country } from "./country";
import { Region } from "./region.type";

// export interface CacheStore {
//   byCapital: {
//     term: string;
//     countries: Country[];
//   }
// }
export interface CacheStore {
  byCapital: TermCountries;
  byCountries: TermCountries;
  byRegion: RegionCountries;
}

export interface TermCountries{
  term: string;
  countries: Country[];
}

// Region is optional because we don't want to force a default when loading the region component FOR THE FIRST TIME
export interface RegionCountries{
  region?: Region | '';
  countries: Country[];
}
