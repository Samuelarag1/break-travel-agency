"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import {
  ChevronRight,
  MapPin,
  PalmtreeIcon,
  Plane,
  Star,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Testimonial } from "@/components/testimonial";
import { DestinationCard } from "@/components/destination-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { DestinationSearch } from "@/components/destination-search";
import { destinations, testimonials } from "@/lib/data";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);



  return (
    <div
      className={`min-h-screen bg-white ${
        isLoaded ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <Image
            src="/images/hero.jpg"
            alt="Playa paradisíaca"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
        </motion.div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 text-center text-white pt-20 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-2"
          >
            <PalmtreeIcon className="mx-auto h-16 w-16" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          >
            DESCUBRE TU <span className="text-rose-400">BREAK</span> PERFECTO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 max-w-2xl text-lg text-gray-100 sm:text-xl"
          >
            Experiencias únicas, destinos increíbles y momentos inolvidables te
            esperan
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <Button
              size="lg"
              className="bg-rose-500 text-white hover:bg-rose-600"
            >
              Explorar destinos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white/20"
            >
              Ver ofertas especiales
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative z-10 w-full"
        >
          <div className="mx-auto max-w-5xl rounded-t-3xl bg-white p-6 shadow-lg">
            <Tabs defaultValue="vuelos" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="vuelos" className="text-sm sm:text-base">
                  <Plane className="mr-2 h-4 w-4" />
                  Vuelos
                </TabsTrigger>
                <TabsTrigger value="hoteles" className="text-sm sm:text-base">
                  <PalmtreeIcon className="mr-2 h-4 w-4" />
                  Hoteles
                </TabsTrigger>
                <TabsTrigger value="paquetes" className="text-sm sm:text-base">
                  <Users className="mr-2 h-4 w-4" />
                  Paquetes
                </TabsTrigger>
              </TabsList>
              <TabsContent value="vuelos" className="mt-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Origen</label>
                    <DestinationSearch placeholder="Ciudad de origen" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destino</label>
                    <DestinationSearch placeholder="Ciudad de destino" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fechas</label>
                    <DatePickerWithRange />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-rose-500 hover:bg-rose-600">
                      Buscar
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="hoteles" className="mt-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destino</label>
                    <DestinationSearch placeholder="Ciudad o hotel" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Check-in / Check-out
                    </label>
                    <DatePickerWithRange />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Huéspedes</label>
                    <input
                      type="text"
                      placeholder="2 adultos, 0 niños"
                      className="w-full rounded-md border border-gray-300 p-2 focus:border-rose-500 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-rose-500 hover:bg-rose-600">
                      Buscar
                    </Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="paquetes" className="mt-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Origen</label>
                    <DestinationSearch placeholder="Ciudad de origen" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Destino</label>
                    <DestinationSearch placeholder="Ciudad de destino" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fechas</label>
                    <DatePickerWithRange />
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-rose-500 hover:bg-rose-600">
                      Buscar
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </section>

      {/* Destinos Populares */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Destinos <span className="text-rose-500">Populares</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Descubre los destinos más buscados por nuestros viajeros y
              prepárate para vivir experiencias inolvidables
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button size="lg" className="bg-rose-500 hover:bg-rose-600">
              Ver todos los destinos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ofertas <span className="text-rose-500">Especiales</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Aprovecha nuestras promociones exclusivas por tiempo limitado y
              haz realidad tu próxima aventura
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/cancun.jpg"
                  alt="Cancún"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute left-0 top-0 bg-rose-500 p-2 text-sm font-bold text-white">
                  -30%
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Cancún Todo Incluido</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                  </div>
                </div>
                <div className="mb-4 flex items-center text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span className="text-sm">Cancún, México</span>
                </div>
                <p className="mb-4 text-gray-600">
                  7 días en resort 5 estrellas con todas las comidas y bebidas
                  incluidas, acceso a actividades exclusivas y más.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-rose-500">
                      $899
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      $1,299
                    </span>
                  </div>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                    Reservar
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/paris.webp"
                  alt="París"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute left-0 top-0 bg-rose-500 p-2 text-sm font-bold text-white">
                  -25%
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Escapada a París</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">4.7</span>
                  </div>
                </div>
                <div className="mb-4 flex items-center text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span className="text-sm">París, Francia</span>
                </div>
                <p className="mb-4 text-gray-600">
                  5 días en hotel boutique, desayuno incluido, tour por la
                  ciudad y entrada a los principales museos.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-rose-500">
                      $1,199
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      $1,599
                    </span>
                  </div>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                    Reservar
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/tokyo.jpeg"
                  alt="Tokio"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute left-0 top-0 bg-rose-500 p-2 text-sm font-bold text-white">
                  -20%
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Aventura en Tokio</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">4.9</span>
                  </div>
                </div>
                <div className="mb-4 flex items-center text-gray-500">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span className="text-sm">Tokio, Japón</span>
                </div>
                <p className="mb-4 text-gray-600">
                  8 días explorando la cultura japonesa, alojamiento céntrico,
                  guía en español y transporte incluido.
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-rose-500">
                      $1,599
                    </span>
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      $1,999
                    </span>
                  </div>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                    Reservar
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              ¿Por qué elegir <span className="text-rose-500">BREAK</span>?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Nos dedicamos a crear experiencias de viaje excepcionales que
              superan tus expectativas
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white p-6 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Calidad Garantizada</h3>
              <p className="text-gray-600">
                Seleccionamos cuidadosamente cada alojamiento y servicio para
                asegurar la mejor experiencia.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white p-6 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Precios Competitivos</h3>
              <p className="text-gray-600">
                Ofrecemos las mejores tarifas del mercado sin comprometer la
                calidad de nuestros servicios.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white p-6 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Experiencias Únicas</h3>
              <p className="text-gray-600">
                Creamos itinerarios personalizados que te permiten descubrir
                cada destino de manera auténtica.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="rounded-xl bg-white p-6 text-center shadow-lg"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold">Atención 24/7</h3>
              <p className="text-gray-600">
                Nuestro equipo está disponible en todo momento para asistirte
                durante tu viaje.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-gray-50 py-20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Lo que dicen nuestros{" "}
              <span className="text-rose-500">viajeros</span>
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Descubre las experiencias de quienes ya han viajado con nosotros
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Testimonial testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cta-background.jpg"
            alt="Playa al atardecer"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center text-white"
          >
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              ¿Listo para tu próxima aventura?
            </h2>
            <p className="mb-8 text-lg">
              Suscríbete a nuestro boletín y recibe ofertas exclusivas, consejos
              de viaje y mucho más.
            </p>
            <NewsletterForm />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
