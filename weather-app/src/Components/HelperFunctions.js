export const getDayName = (localtime, number = 0) => {
  const daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(localtime);
  const dayNumber = date.getDay();
  if (number === 0) return daysList[dayNumber];
  else if (number === 1 && daysList.length + 1 > daysList.length)
    return daysList[dayNumber + 1];
  else if (number === 2 && daysList.length + 2 > daysList.length)
    return daysList[dayNumber + 2];
  else if (number === 3 && daysList.length + 3 > daysList.length)
    return daysList[dayNumber + 3];
  else return daysList[0];
};
