"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";
import {
  ArrowRightLeft,
  BriefcaseBusiness,
  CreditCard,
  Hotel,
  Package,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";

import { cities } from "@/lib/data";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { DestinationSearch } from "@/components/destination-search";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createDateRange,
  formatTravelRange,
  getRangeNights,
  getTravelBaseDate,
} from "@/lib/travel-utils";

type SearchTab = "vuelos" | "hoteles" | "paquetes";

type SearchPreview = {
  badge: string;
  title: string;
  description: string;
  price: string;
  priceHint: string;
  chips: string[];
};

type FlightFormState = {
  origin: string;
  destination: string;
  dates: DateRange | undefined;
  passengers: string;
  cabin: string;
  directOnly: boolean;
};

type HotelFormState = {
  destination: string;
  dates: DateRange | undefined;
  guests: string;
  rooms: string;
  mealPlan: string;
};

type PackageFormState = {
  origin: string;
  destination: string;
  dates: DateRange | undefined;
  travelers: string;
  style: string;
  financing: string;
};

const currencyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const flightPassengerOptions = [
  { value: "1", label: "1 adulto" },
  { value: "2", label: "2 adultos" },
  { value: "3", label: "2 adultos y 1 nino" },
  { value: "4", label: "4 viajeros" },
];

const cabinOptions = [
  { value: "economy", label: "Economy" },
  { value: "premium", label: "Premium Economy" },
  { value: "business", label: "Business" },
];

const hotelGuestOptions = [
  { value: "2", label: "2 huespedes" },
  { value: "3", label: "2 adultos y 1 nino" },
  { value: "4", label: "4 huespedes" },
];

const hotelRoomOptions = [
  { value: "1", label: "1 habitacion" },
  { value: "2", label: "2 habitaciones" },
];

const mealPlanOptions = [
  { value: "room-only", label: "Solo alojamiento" },
  { value: "breakfast", label: "Desayuno incluido" },
  { value: "half-board", label: "Media pension" },
];

const packageTravelerOptions = [
  { value: "2", label: "2 viajeros" },
  { value: "3", label: "3 viajeros" },
  { value: "4", label: "4 viajeros" },
];

const packageStyleOptions = [
  { value: "beach", label: "Relax y playa" },
  { value: "cultural", label: "Cultural y gastronomico" },
  { value: "premium", label: "Premium con experiencias" },
];

const financingOptions = [
  { value: "6", label: "Hasta 6 cuotas" },
  { value: "12", label: "Hasta 12 cuotas" },
  { value: "cash", label: "Pago total" },
];

function formatPrice(amount: number) {
  return currencyFormatter.format(amount);
}

function getCity(value: string) {
  return cities.find((city) => city.value === value);
}

function getOptionLabel(
  value: string,
  options: Array<{ value: string; label: string }>
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function buildFlightPreview(form: FlightFormState): SearchPreview {
  const origin = getCity(form.origin);
  const destination = getCity(form.destination);
  const nights = getRangeNights(form.dates);
  const basePrice = destination?.flightFromPrice ?? 0;
  const cabinMultiplier =
    form.cabin === "business" ? 2.3 : form.cabin === "premium" ? 1.45 : 1;
  const directSurcharge = form.directOnly ? 95 : 0;
  const estimatedPrice = Math.round((basePrice + directSurcharge) * cabinMultiplier);

  return {
    badge: "Tarifa estimada",
    title: `${origin?.code ?? "---"} a ${destination?.code ?? "---"} desde ${formatPrice(
      estimatedPrice
    )}`,
    description: `${origin?.shortLabel ?? "Origen"} -> ${
      destination?.shortLabel ?? "Destino"
    } | ${formatTravelRange(form.dates)} | ${nights} noches`,
    price: formatPrice(estimatedPrice),
    priceHint: "Precio por persona con equipaje de mano incluido.",
    chips: [
      getOptionLabel(form.passengers, flightPassengerOptions),
      getOptionLabel(form.cabin, cabinOptions),
      form.directOnly ? "Solo vuelos directos" : "Con escalas optimizadas",
    ],
  };
}

function buildHotelPreview(form: HotelFormState): SearchPreview {
  const destination = getCity(form.destination);
  const nights = getRangeNights(form.dates);
  const roomCount = Number(form.rooms);
  const mealPlanSurcharge =
    form.mealPlan === "half-board" ? 55 : form.mealPlan === "breakfast" ? 25 : 0;
  const nightlyRate = (destination?.hotelFromPrice ?? 0) + mealPlanSurcharge;
  const estimatedTotal = nightlyRate * Math.max(nights, 1) * Math.max(roomCount, 1);

  return {
    badge: "Hotel recomendado",
    title: `${destination?.shortLabel ?? "Destino"} con estadia desde ${formatPrice(
      estimatedTotal
    )}`,
    description: `${formatTravelRange(form.dates)} | ${nights} noches | ${
      destination?.country ?? "Destino"
    }`,
    price: formatPrice(estimatedTotal),
    priceHint: "Total estimado para la estadia seleccionada.",
    chips: [
      getOptionLabel(form.guests, hotelGuestOptions),
      getOptionLabel(form.rooms, hotelRoomOptions),
      getOptionLabel(form.mealPlan, mealPlanOptions),
    ],
  };
}

function buildPackagePreview(form: PackageFormState): SearchPreview {
  const origin = getCity(form.origin);
  const destination = getCity(form.destination);
  const styleSurcharge =
    form.style === "premium" ? 420 : form.style === "cultural" ? 160 : 0;
  const estimatedPrice = (destination?.packageFromPrice ?? 0) + styleSurcharge;

  return {
    badge: "Paquete destacado",
    title: `${destination?.shortLabel ?? "Destino"} desde ${formatPrice(estimatedPrice)}`,
    description: `${origin?.shortLabel ?? "Origen"} -> ${
      destination?.shortLabel ?? "Destino"
    } | ${formatTravelRange(form.dates)}`,
    price: formatPrice(estimatedPrice),
    priceHint: "Precio por persona con vuelos, hotel y asistencia.",
    chips: [
      getOptionLabel(form.travelers, packageTravelerOptions),
      getOptionLabel(form.style, packageStyleOptions),
      getOptionLabel(form.financing, financingOptions),
    ],
  };
}

export function TravelSearchPanel() {
  const [baseDate] = React.useState(() => getTravelBaseDate());
  const [activeTab, setActiveTab] = React.useState<SearchTab>("vuelos");

  const [flightForm, setFlightForm] = React.useState<FlightFormState>(() => ({
    origin: "buenos-aires",
    destination: "cancun",
    dates: createDateRange(baseDate, 30, 7),
    passengers: "2",
    cabin: "economy",
    directOnly: false,
  }));

  const [hotelForm, setHotelForm] = React.useState<HotelFormState>(() => ({
    destination: "paris",
    dates: createDateRange(baseDate, 45, 4),
    guests: "2",
    rooms: "1",
    mealPlan: "breakfast",
  }));

  const [packageForm, setPackageForm] = React.useState<PackageFormState>(() => ({
    origin: "buenos-aires",
    destination: "tokio",
    dates: createDateRange(baseDate, 75, 9),
    travelers: "2",
    style: "cultural",
    financing: "12",
  }));

  const [preview, setPreview] = React.useState<SearchPreview>(() =>
    buildFlightPreview(flightForm)
  );

  const isFlightValid =
    Boolean(flightForm.origin) &&
    Boolean(flightForm.destination) &&
    flightForm.origin !== flightForm.destination &&
    Boolean(flightForm.dates?.from) &&
    Boolean(flightForm.dates?.to);

  const isHotelValid =
    Boolean(hotelForm.destination) &&
    Boolean(hotelForm.dates?.from) &&
    Boolean(hotelForm.dates?.to);

  const isPackageValid =
    Boolean(packageForm.origin) &&
    Boolean(packageForm.destination) &&
    packageForm.origin !== packageForm.destination &&
    Boolean(packageForm.dates?.from) &&
    Boolean(packageForm.dates?.to);

  function syncPreview(nextTab: SearchTab) {
    if (nextTab === "vuelos") {
      setPreview(buildFlightPreview(flightForm));
      return;
    }

    if (nextTab === "hoteles") {
      setPreview(buildHotelPreview(hotelForm));
      return;
    }

    setPreview(buildPackagePreview(packageForm));
  }

  function handleTabChange(nextValue: string) {
    const nextTab = nextValue as SearchTab;
    setActiveTab(nextTab);
    syncPreview(nextTab);
  }

  function handleFlightSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFlightValid) {
      return;
    }

    setPreview(buildFlightPreview(flightForm));
  }

  function handleHotelSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isHotelValid) {
      return;
    }

    setPreview(buildHotelPreview(hotelForm));
  }

  function handlePackageSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isPackageValid) {
      return;
    }

    setPreview(buildPackagePreview(packageForm));
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid h-auto w-full grid-cols-3 rounded-2xl bg-stone-100 p-1">
        <TabsTrigger value="vuelos" className="py-3 text-sm sm:text-base">
          <Plane className="mr-2 h-4 w-4" />
          Vuelos
        </TabsTrigger>
        <TabsTrigger value="hoteles" className="py-3 text-sm sm:text-base">
          <Hotel className="mr-2 h-4 w-4" />
          Hoteles
        </TabsTrigger>
        <TabsTrigger value="paquetes" className="py-3 text-sm sm:text-base">
          <Package className="mr-2 h-4 w-4" />
          Paquetes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="vuelos" className="mt-5">
        <form onSubmit={handleFlightSubmit} className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[1.1fr_auto_1.1fr_1.2fr]">
            <div className="space-y-2">
              <label className="text-sm font-medium">Origen</label>
              <DestinationSearch
                placeholder="Ciudad de origen"
                value={flightForm.origin}
                onValueChange={(origin) =>
                  setFlightForm((current) => ({ ...current, origin }))
                }
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="mb-[2px]"
                onClick={() =>
                  setFlightForm((current) => ({
                    ...current,
                    origin: current.destination,
                    destination: current.origin,
                  }))
                }
                aria-label="Intercambiar origen y destino"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destino</label>
              <DestinationSearch
                placeholder="Ciudad de destino"
                value={flightForm.destination}
                onValueChange={(destination) =>
                  setFlightForm((current) => ({ ...current, destination }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fechas</label>
              <DatePickerWithRange
                value={flightForm.dates}
                onChange={(dates) =>
                  setFlightForm((current) => ({ ...current, dates }))
                }
                minDate={baseDate}
                minNights={2}
                maxNights={21}
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pasajeros</label>
                <Select
                  value={flightForm.passengers}
                  onValueChange={(passengers) =>
                    setFlightForm((current) => ({ ...current, passengers }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona pasajeros" />
                  </SelectTrigger>
                  <SelectContent>
                    {flightPassengerOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cabina</label>
                <Select
                  value={flightForm.cabin}
                  onValueChange={(cabin) =>
                    setFlightForm((current) => ({ ...current, cabin }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de cabina" />
                  </SelectTrigger>
                  <SelectContent>
                    {cabinOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-2xl border bg-stone-50 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Solo vuelos directos</p>
                  <p className="text-xs text-muted-foreground">
                    Ideal para demo con tiempos de viaje mas cortos.
                  </p>
                </div>
                <Switch
                  checked={flightForm.directOnly}
                  onCheckedChange={(directOnly) =>
                    setFlightForm((current) => ({ ...current, directOnly }))
                  }
                />
              </div>
            </div>

            <div className="flex items-end">
              <Button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600"
                disabled={!isFlightValid}
              >
                Buscar vuelos
              </Button>
            </div>
          </div>

          {flightForm.origin === flightForm.destination ? (
            <p className="text-sm text-amber-600">
              Origen y destino deben ser distintos para cotizar.
            </p>
          ) : null}
        </form>
      </TabsContent>

      <TabsContent value="hoteles" className="mt-5">
        <form onSubmit={handleHotelSubmit} className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_1.1fr_0.8fr_0.8fr]">
            <div className="space-y-2">
              <label className="text-sm font-medium">Destino</label>
              <DestinationSearch
                placeholder="Ciudad o zona"
                value={hotelForm.destination}
                onValueChange={(destination) =>
                  setHotelForm((current) => ({ ...current, destination }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Check-in / Check-out</label>
              <DatePickerWithRange
                value={hotelForm.dates}
                onChange={(dates) =>
                  setHotelForm((current) => ({ ...current, dates }))
                }
                minDate={baseDate}
                minNights={1}
                maxNights={14}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Huespedes</label>
              <Select
                value={hotelForm.guests}
                onValueChange={(guests) =>
                  setHotelForm((current) => ({ ...current, guests }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Huespedes" />
                </SelectTrigger>
                <SelectContent>
                  {hotelGuestOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Habitaciones</label>
              <Select
                value={hotelForm.rooms}
                onValueChange={(rooms) =>
                  setHotelForm((current) => ({ ...current, rooms }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Habitaciones" />
                </SelectTrigger>
                <SelectContent>
                  {hotelRoomOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="space-y-2">
              <label className="text-sm font-medium">Regimen</label>
              <Select
                value={hotelForm.mealPlan}
                onValueChange={(mealPlan) =>
                  setHotelForm((current) => ({ ...current, mealPlan }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Regimen" />
                </SelectTrigger>
                <SelectContent>
                  {mealPlanOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600"
                disabled={!isHotelValid}
              >
                Buscar hoteles
              </Button>
            </div>
          </div>
        </form>
      </TabsContent>

      <TabsContent value="paquetes" className="mt-5">
        <form onSubmit={handlePackageSubmit} className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1.1fr]">
            <div className="space-y-2">
              <label className="text-sm font-medium">Origen</label>
              <DestinationSearch
                placeholder="Desde donde sales"
                value={packageForm.origin}
                onValueChange={(origin) =>
                  setPackageForm((current) => ({ ...current, origin }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Destino</label>
              <DestinationSearch
                placeholder="Destino sonado"
                value={packageForm.destination}
                onValueChange={(destination) =>
                  setPackageForm((current) => ({ ...current, destination }))
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Fechas del viaje</label>
              <DatePickerWithRange
                value={packageForm.dates}
                onChange={(dates) =>
                  setPackageForm((current) => ({ ...current, dates }))
                }
                minDate={baseDate}
                minNights={3}
                maxNights={18}
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]">
            <div className="space-y-2">
              <label className="text-sm font-medium">Viajeros</label>
              <Select
                value={packageForm.travelers}
                onValueChange={(travelers) =>
                  setPackageForm((current) => ({ ...current, travelers }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Viajeros" />
                </SelectTrigger>
                <SelectContent>
                  {packageTravelerOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Estilo</label>
              <Select
                value={packageForm.style}
                onValueChange={(style) =>
                  setPackageForm((current) => ({ ...current, style }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de paquete" />
                </SelectTrigger>
                <SelectContent>
                  {packageStyleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Financiacion</label>
              <Select
                value={packageForm.financing}
                onValueChange={(financing) =>
                  setPackageForm((current) => ({ ...current, financing }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Forma de pago" />
                </SelectTrigger>
                <SelectContent>
                  {financingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600"
                disabled={!isPackageValid}
              >
                Buscar paquetes
              </Button>
            </div>
          </div>

          {packageForm.origin === packageForm.destination ? (
            <p className="text-sm text-amber-600">
              El paquete necesita origen y destino diferentes.
            </p>
          ) : null}
        </form>
      </TabsContent>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
        <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-rose-500" />
          Asistencia 24/7
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5">
          <CreditCard className="h-3.5 w-3.5 text-rose-500" />
          Pagos en cuotas para la demo
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5">
          <Users className="h-3.5 w-3.5 text-rose-500" />
          Itinerarios pensados para familias y parejas
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5">
          <BriefcaseBusiness className="h-3.5 w-3.5 text-rose-500" />
          Cotizacion clara por categoria
        </span>
      </div>

      <div className="mt-5 rounded-3xl border border-stone-200 bg-gradient-to-br from-stone-50 via-white to-rose-50 p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-500">
              {preview.badge}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">
              {preview.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600">{preview.description}</p>
          </div>

          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm lg:min-w-60">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Referencia
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {preview.price}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {preview.priceHint}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {preview.chips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </Tabs>
  );
}
