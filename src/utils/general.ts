/* eslint-disable no-nested-ternary */
const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

// export const emailOTP = generateRandomNumber(1000, 9999);

const isValidDate = (dateString: string) => {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateString.match(regEx)) return false; // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if (!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0, 10) === dateString;
};

const weekDays = ["seg", "ter", "qua", "qui", "sex", "sab", "dom"];
const objWeekDays = [
  {
    dia: "dom",
    value: 0,
  },
  {
    dia: "seg",
    value: 1,
  },
  {
    dia: "ter",
    value: 2,
  },
  {
    dia: "qua",
    value: 3,
  },
  {
    dia: "qui",
    value: 4,
  },
  {
    dia: "sex",
    value: 5,
  },
  {
    dia: "sab",
    value: 6,
  },
];

const formatDateString = (dateString: string) => {
  const [day, month, year] = dateString.split("/");
  const date = new Date(`${year}-${month}-${day}T00:00:00`);
  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000; // em milissegundos
  date.setTime(date.getTime() + timezoneOffset);
  return date;
};

export {
  isJsonString,
  generateRandomNumber,
  isValidDate,
  formatDateString,
  weekDays,
  objWeekDays,
};
