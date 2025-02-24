import "dayjs/locale/ru";
import dayjs from "dayjs";

dayjs.locale("ru");

export const dateFormatter = (date: string | undefined) =>
  date ? dayjs().locale("ru").format("DD MMMM YYYY") : date;
