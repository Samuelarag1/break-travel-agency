export const destinations = [
  {
    id: 1,
    name: "Santorini, Grecia",
    image: "/images/santorini.jpg",
    price: "$1,299",
    rating: 4.9,
    duration: "7 días",
    description: "Santorini es una de las islas Cícladas en el mar Egeo. Devastada por una erupción volcánica en el siglo XVI a. C., su paisaje agreste y multicolor se compone de acantilados altísimos sobre una caldera submarina.",
    reviews: [
      {
        id: 1,
        user: "Ana García",
        rating: 5,
        comment: "Vistas espectaculares, la puesta de sol en Oia es imperdible.",
      },
      {
        id: 2,
        user: "John Doe",
        rating: 4,
        comment: "Muy bonito pero un poco lleno de gente.",
      },
    ],
    gallery: [
      "/images/santorini-1.jpg",
      "/images/santorini-2.jpg",
      "/images/santorini-3.jpg",
    ],
  },
  {
    id: 2,
    name: "Bali, Indonesia",
    image: "/images/bali.jpg",
    price: "$1,199",
    rating: 4.8,
    duration: "10 días",
    description: "Bali es una isla de Indonesia conocida por sus frondosas montañas volcánicas, los icónicos arrozales, las playas y los arrecifes de coral. La isla alberga sitios religiosos como el templo Uluwatu en el acantilado.",
    reviews: [
      {
        id: 1,
        user: "Carlos Ruiz",
        rating: 5,
        comment: "La cultura y la gente son maravillosas. Volveré seguro.",
      },
    ],
    gallery: ["/images/bali-1.jpg", "/images/bali-2.jpg"],
  },
  {
    id: 3,
    name: "Tulum, México",
    image: "/images/tulum.jpg",
    price: "$899",
    rating: 4.7,
    duration: "5 días",
    description: "Tulum es una ciudad en la costa caribeña de la península de Yucatán en México. Es conocida por sus ruinas bien conservadas de una antigua ciudad portuaria maya.",
    reviews: [],
    gallery: ["/images/tulum-1.jpg", "/images/tulum-2.jpg"],
  },
  {
    id: 4,
    name: "Maldivas",
    image: "/images/maldivas.jpg",
    price: "$1,899",
    rating: 5.0,
    duration: "8 días",
    description: "Las Maldivas, oficialmente la República de Maldivas, es un país insular del sur de Asia, situado en el océano Índico. Se encuentra al suroeste de Sri Lanka y la India.",
    reviews: [
      {
        id: 1,
        user: "Elena White",
        rating: 5,
        comment: "El paraíso en la tierra. No hay palabras para describirlo.",
      },
    ],
    gallery: ["/images/maldivas-1.jpg", "/images/maldivas-2.jpg"],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Aventurera",
    content:
      "Mi viaje a Bali con BREAK fue increíble. Todo estaba perfectamente organizado y el servicio al cliente fue excepcional. ¡Definitivamente volveré a viajar con ellos!",
    avatar: "/images/avatar-1.jpg",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Fotógrafo de viajes",
    content:
      "Como fotógrafo, busco destinos únicos y BREAK siempre me sorprende con sus recomendaciones. Su atención al detalle hace que cada viaje sea una experiencia inolvidable.",
    avatar: "/images/avatar-2.jpg",
  },
  {
    id: 3,
    name: "Laura Martínez",
    role: "Viajera frecuente",
    content:
      "He viajado con muchas agencias, pero BREAK realmente entiende lo que busco. Sus paquetes personalizados y el conocimiento local de sus guías marcan la diferencia.",
    avatar: "/images/avatar-3.jpg",
  },
];

export const cities = [
  { value: "madrid", label: "Madrid, España" },
  { value: "barcelona", label: "Barcelona, España" },
  { value: "paris", label: "París, Francia" },
  { value: "londres", label: "Londres, Reino Unido" },
  { value: "roma", label: "Roma, Italia" },
  { value: "tokio", label: "Tokio, Japón" },
  { value: "nueva-york", label: "Nueva York, EEUU" },
  { value: "buenos-aires", label: "Buenos Aires, Argentina" },
  { value: "cancun", label: "Cancún, México" },
  { value: "tulum", label: "Tulum, México" },
  { value: "bali", label: "Bali, Indonesia" },
  { value: "santorini", label: "Santorini, Grecia" },
  { value: "dubai", label: "Dubái, EAU" },
  { value: "sydney", label: "Sídney, Australia" },
  { value: "rio-de-janeiro", label: "Río de Janeiro, Brasil" },
];
