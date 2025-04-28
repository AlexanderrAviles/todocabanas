import axios from "axios";
import type { Owner } from "../types/Owner";

const API_URL = `${import.meta.env.API_URL}/owner`;
const API_KEY = import.meta.env.API_KEY;

export async function getOwners(
  pageSize: number = 6,
  offset?: string
): Promise<{ owners: Owner[]; offset?: string }> {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: {
        pageSize,
        offset,
      },
    });

    const owners = response.data.records.map((record: any) => ({
      id: record.id,
      createdTime: record.createdTime,
      name: record.fields.name,
      phone: record.fields.number,
      email: record.fields.email || "",
      rut: record.fields.rut || "",
      images: record.fields.photo || [],
      cabin: record.fields.cabin || [],
      status: record.fields.status || false,
    }));

    return {
      owners,
      offset: response.data.offset, // ⬅️ Airtable devuelve offset si hay más páginas
    };
  } catch (error) {
    console.error("Error fetching owners:", error);
    return { owners: [] };
  }
}

export async function getOwnerById(id: string): Promise<Owner | null> {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const record = response.data;

    return {
      id: record.id,
      createdTime: record.createdTime,
      name: record.fields.name,
      phone: record.fields.number,
      email: record.fields.email || "",
      rut: record.fields.rut || "",
      images: record.fields.photo || [],
      cabin: record.fields.cabin || [],
      status: record.fields.status || false,
    };
  } catch (error) {
    console.error("Error fetching owner by ID:", error);
    return null;
  }
}
