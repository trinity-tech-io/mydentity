import { formatDistanceToNow } from 'date-fns';

export const getDateDistance = (date: Date): string =>
  date
    ? formatDistanceToNow(date, { addSuffix: true })
        .replace('about', '')
        .trim()
    : '';