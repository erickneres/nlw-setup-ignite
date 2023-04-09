import dayjs from "dayjs";

export function generateDateFromYearBeginning() {
  const firstDayOfTheYear = dayjs().startOf('year');
  const today = new Date();

  // const today2 = dayjs(today).add(185, 'day')

  const dates = [];
  let compareDate = firstDayOfTheYear;

  while(compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dates;
}