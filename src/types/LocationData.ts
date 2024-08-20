export type LocationData = {
  admin1: string
  admin1_id: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  timezone: string;
};

export type PlaceData = Pick<LocationData, "name" | "country">;
