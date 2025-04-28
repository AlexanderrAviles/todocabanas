export interface BannerImage {
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

export interface Banner {
  id: string;
  createdTime: string;
  bannerId: number;
  name: string;
  status: boolean;
  image: BannerImage[];
  image_mobile: BannerImage[];
}
