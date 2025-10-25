import { clsx, type ClassValue } from "clsx"
import { FieldValues, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
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


export const formatFileSize = (bytes: number): string => {
  if (!bytes) return "0 Bytes";
  const units = ["Bytes", "KB", "MB", "GB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
};


export function convertSeconds(seconds: number, returnType: "hours" | "minutes" | "seconds" = "hours"): number {
  if (isNaN(seconds) || seconds < 0) throw new Error("Invalid seconds input");

  switch (returnType) {
    case "hours":
      return parseFloat((seconds / 3600).toFixed(2));
    case "minutes":
      return parseFloat((seconds / 60).toFixed(2));
    case "seconds":
    default:
      return parseFloat(seconds.toFixed(2));
  }
}


export function getStringifiedDuration(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) throw new Error("Invalid seconds input");

  let duration = parseFloat((seconds / 3600).toFixed(2)); // In hours
  if (duration >= 1) return `${duration} hour(s)`
  duration = parseFloat((seconds / 60).toFixed(2));
  if (duration >= 1) return `${duration} minute(s)`
  return `${seconds} second(s)`
  
}


export function withFormValidation<T extends FieldValues, R>(
    form: UseFormReturn<T>,
    submitFn: (values: T) => Promise<R>,
) {
  return () =>
  new Promise<R | false>((resolve) => {
    form.handleSubmit(
      async (values) => resolve(await submitFn(values)),
      () => resolve(false)
    )()
  })
}


export const validateMP4File = (file: File): Promise<{ valid: boolean; duration?: number }> => {
  return new Promise((resolve) => {
    if (file.type !== "video/mp4") {
      toast.error("Only MP4 files are allowed.");
      return resolve({ valid: false });
    }

    const video = document.createElement("video");
    video.preload = "metadata";

    const url = URL.createObjectURL(file);
    video.src = url;

    video.onloadedmetadata = () => {
      const duration = video.duration;
      const isSupported = 
        MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E"') || // H.264
        MediaSource.isTypeSupported('video/mp4; codecs="hev1"') ||        // H.265 (HEVC)
        MediaSource.isTypeSupported('video/mp4; codecs="hvc1"');

      URL.revokeObjectURL(url);

      if (!isSupported) {
        toast.error("Unsupported codec. Only H.264 or H.265 MP4 videos are allowed.");
        return resolve({ valid: false });
      }
      resolve({ valid: true, duration });
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      toast.error("Failed to read video metadata. Ensure it's a valid MP4 file.");
      resolve({ valid: false });
    };
  });
};
