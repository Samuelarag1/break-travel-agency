export type DestinationReview = {
  id: number;
  user: string;
  rating: number;
  comment: string;
};

export type Destination = {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
  duration: string;
  description: string;
  reviews: DestinationReview[];
  gallery: string[];
};

export type TestimonialItem = {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
};

export type CityOption = {
  value: string;
  label: string;
  shortLabel: string;
  country: string;
  code: string;
  flightFromPrice: number;
  hotelFromPrice: number;
  packageFromPrice: number;
};

export const destinations: Destination[] = [
  {
    id: 1,
    name: "Santorini, Grecia",
    image: "/images/santorini.jpg",
    price: "USD 1,299",
    rating: 4.9,
    duration: "7 dias",
    description:
      "Santorini combina pueblos blancos, hoteles boutique y vistas abiertas a la caldera. Es ideal para lunas de miel, escapadas premium y viajeros que buscan playa, gastronomia y atardeceres memorables.",
    reviews: [
      {
        id: 1,
        user: "Ana Garcia",
        rating: 5,
        comment: "Vistas espectaculares y una coordinacion impecable.",
      },
      {
        id: 2,
        user: "John Doe",
        rating: 4,
        comment: "Muy buena experiencia, especialmente el hotel y los traslados.",
      },
    ],
    gallery: [
      "/images/santorini.jpg",
      "/images/paris.webp",
      "/images/maldivas.jpg",
    ],
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "/images/bali.jpg",
    price: "USD 1,199",
    rating: 4.8,
    duration: "10 dias",
    description:
      "Bali es una opcion muy buscada por quienes quieren combinar playas, bienestar, cultura local y hoteles con gran relacion precio-calidad. Funciona muy bien para viajes de 8 a 12 noches.",
    reviews: [
      {
        id: 1,
        user: "Carlos Ruiz",
        rating: 5,
        comment: "La organizacion del itinerario fue excelente. Volveria sin dudar.",
      },
    ],
    gallery: ["/images/bali.jpg", "/images/tulum.jpg", "/images/maldivas.jpg"],
  },
  {
    id: 3,
    name: "Tulum, Mexico",
    image: "/images/tulum.jpg",
    price: "USD 899",
    rating: 4.7,
    duration: "5 dias",
    description:
      "Tulum es una escapada caribena muy versatil para parejas y grupos. Se destaca por sus playas, beach clubs, ruinas mayas y opciones all inclusive o boutique.",
    reviews: [
      {
        id: 1,
        user: "Sofia Medina",
        rating: 5,
        comment: "Una combinacion ideal entre descanso, playa y salidas.",
      },
    ],
    gallery: ["/images/tulum.jpg", "/images/cancun.jpg", "/images/bali.jpg"],
  },
  {
    id: 4,
    name: "Maldivas",
    image: "/images/maldivas.jpg",
    price: "USD 1,899",
    rating: 5,
    duration: "8 dias",
    description:
      "Maldivas es uno de los destinos premium por excelencia. Suele reservarse con tiempo para asegurar mejores tarifas, buena conectividad y resorts con pension completa.",
    reviews: [
      {
        id: 1,
        user: "Elena White",
        rating: 5,
        comment: "Una experiencia impecable de principio a fin.",
      },
    ],
    gallery: [
      "/images/maldivas.jpg",
      "/images/santorini.jpg",
      "/images/cancun.jpg",
    ],
  },
];

export const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Maria Gonzalez",
    role: "Aventurera",
    content:
      "Mi viaje a Bali con BREAK fue increible. Todo estaba muy claro desde la reserva hasta los traslados, y eso hizo que realmente pudiera disfrutar.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    role: "Fotografo de viajes",
    content:
      "Valore mucho la calidad de las recomendaciones y la velocidad para resolver cambios. La propuesta del itinerario estuvo muy bien pensada.",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Laura Martinez",
    role: "Viajera frecuente",
    content:
      "La demo transmite muy bien como trabaja una agencia moderna: fechas claras, opciones comparables y seguimiento en cada etapa del viaje.",
    avatar: "/placeholder-user.jpg",
  },
];

export const cities: CityOption[] = [
  {
    value: "buenos-aires",
    label: "Buenos Aires, Argentina",
    shortLabel: "Buenos Aires",
    country: "Argentina",
    code: "EZE",
    flightFromPrice: 430,
    hotelFromPrice: 120,
    packageFromPrice: 690,
  },
  {
    value: "madrid",
    label: "Madrid, Espana",
    shortLabel: "Madrid",
    country: "Espana",
    code: "MAD",
    flightFromPrice: 980,
    hotelFromPrice: 180,
    packageFromPrice: 1490,
  },
  {
    value: "barcelona",
    label: "Barcelona, Espana",
    shortLabel: "Barcelona",
    country: "Espana",
    code: "BCN",
    flightFromPrice: 1020,
    hotelFromPrice: 190,
    packageFromPrice: 1540,
  },
  {
    value: "paris",
    label: "Paris, Francia",
    shortLabel: "Paris",
    country: "Francia",
    code: "CDG",
    flightFromPrice: 1190,
    hotelFromPrice: 260,
    packageFromPrice: 1890,
  },
  {
    value: "londres",
    label: "Londres, Reino Unido",
    shortLabel: "Londres",
    country: "Reino Unido",
    code: "LHR",
    flightFromPrice: 1210,
    hotelFromPrice: 280,
    packageFromPrice: 1940,
  },
  {
    value: "roma",
    label: "Roma, Italia",
    shortLabel: "Roma",
    country: "Italia",
    code: "FCO",
    flightFromPrice: 1080,
    hotelFromPrice: 220,
    packageFromPrice: 1710,
  },
  {
    value: "tokio",
    label: "Tokio, Japon",
    shortLabel: "Tokio",
    country: "Japon",
    code: "HND",
    flightFromPrice: 1890,
    hotelFromPrice: 240,
    packageFromPrice: 2590,
  },
  {
    value: "nueva-york",
    label: "Nueva York, Estados Unidos",
    shortLabel: "Nueva York",
    country: "Estados Unidos",
    code: "JFK",
    flightFromPrice: 860,
    hotelFromPrice: 310,
    packageFromPrice: 1780,
  },
  {
    value: "cancun",
    label: "Cancun, Mexico",
    shortLabel: "Cancun",
    country: "Mexico",
    code: "CUN",
    flightFromPrice: 690,
    hotelFromPrice: 210,
    packageFromPrice: 1290,
  },
  {
    value: "tulum",
    label: "Tulum, Mexico",
    shortLabel: "Tulum",
    country: "Mexico",
    code: "TQO",
    flightFromPrice: 720,
    hotelFromPrice: 240,
    packageFromPrice: 1390,
  },
  {
    value: "bali",
    label: "Bali, Indonesia",
    shortLabel: "Bali",
    country: "Indonesia",
    code: "DPS",
    flightFromPrice: 1720,
    hotelFromPrice: 165,
    packageFromPrice: 2290,
  },
  {
    value: "santorini",
    label: "Santorini, Grecia",
    shortLabel: "Santorini",
    country: "Grecia",
    code: "JTR",
    flightFromPrice: 1490,
    hotelFromPrice: 295,
    packageFromPrice: 2140,
  },
  {
    value: "dubai",
    label: "Dubai, Emiratos Arabes Unidos",
    shortLabel: "Dubai",
    country: "Emiratos Arabes Unidos",
    code: "DXB",
    flightFromPrice: 1340,
    hotelFromPrice: 250,
    packageFromPrice: 2050,
  },
  {
    value: "sydney",
    label: "Sydney, Australia",
    shortLabel: "Sydney",
    country: "Australia",
    code: "SYD",
    flightFromPrice: 1980,
    hotelFromPrice: 230,
    packageFromPrice: 2680,
  },
  {
    value: "rio-de-janeiro",
    label: "Rio de Janeiro, Brasil",
    shortLabel: "Rio de Janeiro",
    country: "Brasil",
    code: "GIG",
    flightFromPrice: 510,
    hotelFromPrice: 170,
    packageFromPrice: 990,
  },
];
