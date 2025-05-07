import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { Task } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    return format(new Date(dateString), 'dd MMM yyyy, HH:mm');
  } catch (error) {
    return dateString || 'N/A';
  }
}

export function parseTaskParams(paramsString: string): Record<string, any> {
  try {
    return JSON.parse(paramsString);
  } catch (error) {
    console.error('Error parsing task params:', error);
    return {};
  }
}

export function getLatestTasks(tasks: Task[], limit: number = 10): Task[] {
  if (!tasks || tasks.length === 0) return [];
  
  return [...tasks]
    .sort((a, b) => new Date(b.modified_at).getTime() - new Date(a.modified_at).getTime())
    .slice(0, limit);
}

export function truncateText(text: string, maxLength: number = 50): string {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
}