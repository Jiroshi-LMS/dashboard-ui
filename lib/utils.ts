import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const localDateToUTC = (date: Date) => {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  return utcDate.toISOString().split("T")[0]; // YYYY-MM-DD
};

export const utcToLocalDate = (utcString: string): Date => {
  const [year, month, day] = utcString.split("-").map(Number);
  return new Date(year, month - 1, day); // Local timezone
};
