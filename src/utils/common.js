import moment from "moment";

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`D MMMM`);
};

export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

export const isOneDay = (firstDay, secondDay) => {

  const a = moment(firstDay);
  const b = moment(secondDay);
  return a.diff(b, `days`) === 0 && firstDay.getDate() === secondDay.getDate();
};
