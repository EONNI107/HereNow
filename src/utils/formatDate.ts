import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(formatArg: string) {
  const date = dayjs().tz(dayjs.tz.guess()).format(formatArg);
  return date;
}