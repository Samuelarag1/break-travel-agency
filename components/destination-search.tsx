"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cities, type CityOption } from "@/lib/data";

type DestinationSearchProps = {
  className?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options?: CityOption[];
};

export function DestinationSearch({
  className,
  placeholder = "Buscar ciudad o aeropuerto",
  value,
  onValueChange,
  options = cities,
}: DestinationSearchProps) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState("");

  const selectedValue = value ?? internalValue;
  const selectedCity = options.find((city) => city.value === selectedValue);

  function handleValueChange(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-auto min-h-10 w-full justify-between gap-3 px-3 py-2 text-left",
            className
          )}
        >
          <div className="flex min-w-0 items-start gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" />
            <div className="min-w-0">
              <p
                className={cn(
                  "truncate text-sm font-medium",
                  !selectedCity && "text-muted-foreground"
                )}
              >
                {selectedCity ? selectedCity.label : placeholder}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {selectedCity
                  ? `${selectedCity.code} | ${selectedCity.country}`
                  : "Busca entre destinos populares"}
              </p>
            </div>
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Busca destino o aeropuerto..." />
          <CommandList>
            <CommandEmpty>No encontramos ese destino.</CommandEmpty>
            <CommandGroup>
              {options.map((city) => (
                <CommandItem
                  key={city.value}
                  value={`${city.label} ${city.code} ${city.country}`}
                  onSelect={() => handleValueChange(city.value)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === city.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{city.label}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {city.country}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {city.code}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
