import axios from "axios";
import type { Banner } from "../types/Banner";

const API_URL = `${import.meta.env.API_URL}/banner`;
const API_KEY = import.meta.env.API_KEY;

export async function getBanners(): Promise<Banner[]> {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    return response.data.records.map((record: any) => ({
      id: record.id,
      createdTime: record.createdTime,
      bannerId: record.fields.id,
      name: record.fields.name,
      status: record.fields.status,
      image: record.fields.image || [],
      image_mobile: record.fields.image_mobile || [],
    }));
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}
