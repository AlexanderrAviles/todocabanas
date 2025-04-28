import axios from "axios";
import type { Cabin } from "../types/Cabin";

// En entorno server (Node), caemos a process.env si import.meta.env no está definido
const API_BASE =
  typeof import.meta !== "undefined" && import.meta.env?.API_URL
    ? import.meta.env.API_URL
    : process.env.API_URL;
const API_KEY =
  typeof import.meta !== "undefined" && import.meta.env?.API_KEY
    ? import.meta.env.API_KEY
    : process.env.API_KEY;

if (!API_BASE || !API_KEY) {
  throw new Error(
    "API_URL o API_KEY no está definido. Asegúrate de tener variables de entorno configuradas"
  );
}

const API_URL = `${API_BASE}/cabin`;

// Cache en memoria para getCabinById
const cabinByIdCache = new Map<
  string,
  { timestamp: number; cabin: Cabin | null }
>();
const CABIN_BY_ID_TTL = 60 * 1000; // 1 minuto

export async function getCabins(
  pageSize: number = 6,
  offset?: string
): Promise<{ cabins: Cabin[]; offset?: string }> {
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

    const cabins = response.data.records.map((record: any) => ({
      id: record.id,
      createdTime: record.createdTime,
      cabinId: record.fields.id,
      name: record.fields.name,
      description: record.fields.description,
      images: record.fields.images || [],
      owner: record.fields.owner || [],
      ownerId: record.fields.owner_id || "",
      emailOwner: record.fields.email_owner || "",
      numberOwner: record.fields.number_owner || "",
      nameOwner: record.fields.name_owner || "",
      rooms: record.fields.rooms || 0,
      bathroom: record.fields.bathroom || 0,
      floors: record.fields.floors || 0,
      city: record.fields.city || "",
      address: record.fields.address || "",
      detail: record.fields.detail || "",
      latitude: parseFloat(record.fields.latitude || "0"),
      longitude: parseFloat(record.fields.longitude || "0"),
    }));

    return {
      cabins,
      offset: response.data.offset,
    };
  } catch (error) {
    console.error("Error fetching cabins:", error);
    return { cabins: [] };
  }
}

export async function getCabinById(id: string): Promise<Cabin | null> {
  const cached = cabinByIdCache.get(id);
  if (cached && Date.now() - cached.timestamp < CABIN_BY_ID_TTL) {
    return cached.cabin;
  }

  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    const record = response.data;
    const cabin: Cabin = {
      id: record.id,
      createdTime: record.createdTime,
      cabinId: record.fields.id,
      name: record.fields.name,
      description: record.fields.description,
      images: record.fields.images || [],
      owner: record.fields.owner || [],
      ownerId: record.fields.owner_id || "",
      emailOwner: record.fields.email_owner || "",
      numberOwner: record.fields.number_owner || "",
      nameOwner: record.fields.name_owner || "",
      rooms: record.fields.rooms || 0,
      bathroom: record.fields.bathroom || 0,
      floors: record.fields.floors || 0,
      city: record.fields.city || "",
      address: record.fields.address || "",
      detail: record.fields.detail || "",
      latitude: parseFloat(record.fields.latitude || "0"),
      longitude: parseFloat(record.fields.longitude || "0"),
    };

    cabinByIdCache.set(id, { timestamp: Date.now(), cabin });
    return cabin;
  } catch (error) {
    console.error("Error fetching cabin by ID:", error);
    cabinByIdCache.set(id, { timestamp: Date.now(), cabin: null });
    return null;
  }
}
