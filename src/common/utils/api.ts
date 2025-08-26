import axios from "axios";
import { getTokenFromDB } from "@/common/utils/getTokenFromDB";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

API.interceptors.request.use(async (config) => {
  const token = await getTokenFromDB();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
