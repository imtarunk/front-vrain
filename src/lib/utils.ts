import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const backendURL = "http://vrain-backend.codextarun.xyz";
// export const backendURL = "http://localhost:5000";
