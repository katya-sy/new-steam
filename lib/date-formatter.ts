import "dayjs/locale/ru";
import dayjs from "dayjs";

dayjs.locale("ru");

export const dateFormatter = (date: string | undefined) =>
  date ? dayjs(date).locale("ru").format("D MMMM YYYY") : date;
