import { clsx, type ClassValue } from "clsx"
import { FieldValues, UseFormReturn } from "react-hook-form";
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