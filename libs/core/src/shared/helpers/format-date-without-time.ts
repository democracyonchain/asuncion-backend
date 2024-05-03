export function formatDateWithoutTime(dateWithoutTime: Date): Date {
  const dateFormated = new Date(dateWithoutTime);
  const offsetTZ = dateFormated.getTimezoneOffset() / 60;
  const allHoursDay = offsetTZ + dateFormated.getHours();
  if (allHoursDay == 24) dateFormated.setMinutes(dateFormated.getTimezoneOffset());
  return dateFormated;
}
