import { addDays, differenceInCalendarDays, format, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

export function getTravelBaseDate(referenceDate: Date = new Date()) {
  return startOfDay(referenceDate);
}

export function createDateRange(
  referenceDate: Date = new Date(),
  offsetDays = 21,
  nights = 6
): DateRange {
  const from = addDays(startOfDay(referenceDate), offsetDays);

  return {
    from,
    to: addDays(from, nights),
  };
}

export function formatTravelDate(date?: Date) {
  return date ? format(date, "d MMM", { locale: es }) : "Sin fecha";
}

export function formatTravelDateLong(date?: Date) {
  return date ? format(date, "EEE d MMM yyyy", { locale: es }) : "Por definir";
}

export function formatTravelRange(
  range?: DateRange,
  placeholder = "Selecciona fechas"
) {
  if (!range?.from) {
    return placeholder;
  }

  if (!range.to) {
    return `Desde ${formatTravelDate(range.from)}`;
  }

  return `${formatTravelDate(range.from)} - ${formatTravelDate(range.to)}`;
}

export function getRangeNights(range?: DateRange) {
  if (!range?.from || !range.to) {
    return 0;
  }

  return Math.max(differenceInCalendarDays(range.to, range.from), 0);
}
