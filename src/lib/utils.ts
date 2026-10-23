import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Склеивает классы Tailwind, более поздние перекрывают ранние (shadcn/ui)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
