export type Address = string | [number, number];

export type Location = {
  id: string;
  address: Address;
  latitude?: number;
  longitude?: number;
}
