import { authOptions } from "@/app/utils/auth";
import { API_URL } from "@/constants/constants";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
const request = axios.create({
  baseURL: API_URL,
  timeout: 16000,
  withCredentials: true,
});

request.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    // Server-side
    const session = await getServerSession(authOptions);
    if (session) {
      config.headers.Authorization = `Bearer ${session?.user.accessToken}`;
    }
  } else {
    // Client-side
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session?.user.accessToken}`;
    }
  }
  return config;
});
request.interceptors.response.use((response) => response.data);

export default request;
