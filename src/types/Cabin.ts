export interface CabinImage {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  width: number;
  height: number;
  thumbnails: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}

export interface Cabin {
  id: string;
  createdTime: string;
  cabinId: number;
  name: string;
  description: string;
  images: CabinImage[];
  owner: string[];
  ownerId: string;
  emailOwner: string;
  numberOwner: string;
  nameOwner: string;
  rooms: number;
  bathroom: number;
  floors: number;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  detail: string;
}
