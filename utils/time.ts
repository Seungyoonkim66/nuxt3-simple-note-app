import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function humanize(date: Date) {
  return dayjs(date).fromNow();
}