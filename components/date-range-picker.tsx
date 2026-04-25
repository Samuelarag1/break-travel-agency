"use client";

import * as React from "react";
import { Calendar as CalendarIcon, MoonStar } from "lucide-react";
import { startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/components/ui/use-mobile";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  createDateRange,
  formatTravelDateLong,
  formatTravelRange,
  getRangeNights,
} from "@/lib/travel-utils";

type DatePreset = {
  label: string;
  offsetDays: number;
  nights: number;
};

const defaultPresets: DatePreset[] = [
  { label: "Fin de semana", offsetDays: 10, nights: 2 },
  { label: "7 noches", offsetDays: 21, nights: 7 },
  { label: "10 noches", offsetDays: 35, nights: 10 },
  { label: "15 noches", offsetDays: 60, nights: 15 },
];

type DatePickerWithRangeProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onChange"
> & {
  value?: DateRange;
  onChange?: (nextValue: DateRange | undefined) => void;
  placeholder?: string;
  minDate?: Date;
  minNights?: number;
  maxNights?: number;
  presets?: DatePreset[];
};

export function DatePickerWithRange({
  className,
  value,
  onChange,
  placeholder = "Selecciona fechas",
  minDate,
  minNights = 2,
  maxNights = 21,
  presets = defaultPresets,
  ...props
}: DatePickerWithRangeProps) {
  const isMobile = useIsMobile();
  const triggerId = React.useId();
  const baseDate = startOfDay(minDate ?? new Date());
  const [internalValue, setInternalValue] = React.useState<DateRange | undefined>(
    () => createDateRange(baseDate, 21, 6)
  );

  const selectedRange = value ?? internalValue;
  const totalNights = getRangeNights(selectedRange);

  function handleRangeChange(nextValue: DateRange | undefined) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onChange?.(nextValue);
  }

  function applyPreset(preset: DatePreset) {
    handleRangeChange(createDateRange(baseDate, preset.offsetDays, preset.nights));
  }

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={triggerId}
            type="button"
            variant="outline"
            className={cn(
              "h-auto min-h-12 w-full justify-start rounded-xl border-stone-200 px-3 py-2.5 text-left font-normal shadow-sm",
              !selectedRange?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-rose-500" />
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                {formatTravelRange(selectedRange, placeholder)}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {selectedRange?.from && selectedRange?.to
                  ? `${totalNights} noches`
                  : "Elige salida y regreso"}
              </p>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[min(94vw,760px)] p-0" align="start">
          <div className="space-y-3 p-3 sm:space-y-4 sm:p-4">
            <div className="grid gap-2 rounded-2xl bg-stone-50 p-2 sm:grid-cols-2 sm:gap-3 sm:p-3">
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Desde
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {formatTravelDateLong(selectedRange?.from)}
                </p>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Hasta
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {formatTravelDateLong(selectedRange?.to)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={() => applyPreset(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={selectedRange?.from ?? baseDate}
                selected={selectedRange}
                onSelect={handleRangeChange}
                numberOfMonths={isMobile ? 1 : 2}
                locale={es}
                min={minNights}
                max={maxNights}
                disabled={{ before: baseDate }}
                showOutsideDays={false}
              />
            </div>

            <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <MoonStar className="h-4 w-4 text-rose-500" />
                <span>
                  Rango recomendado entre {minNights} y {maxNights} noches para
                  una cotizacion rapida.
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRangeChange(undefined)}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
