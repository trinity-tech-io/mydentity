import { formatDistanceToNow } from 'date-fns';

export const getDateDistance = (date: Date) =>
  date
    ? formatDistanceToNow(date, { addSuffix: true })
        .replace('about', '')
        .trim()
    : '';