import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function createdAt(timestamp: string) {
  return dayjs(timestamp).fromNow();
}
