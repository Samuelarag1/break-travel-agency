"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, MapPin, Star, User, ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { destinations } from "@/lib/data"

export default function DestinationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const destination = destinations.find((d) => d.id === parseInt(id))

  if (!destination) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Destino no encontrado</h1>
            <Button asChild className="mt-4">
              <Link href="/">Volver al inicio</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <Image
            src={destination.image}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-8">
            <div className="container mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href="/"
                  className="mb-4 inline-flex items-center text-sm font-medium text-white/80 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Link>
                <h1 className="mb-2 text-4xl font-bold sm:text-5xl md:text-6xl">
                  {destination.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-5 w-5 text-rose-400" />
                    <span>{destination.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span>{destination.rating} (120 reseñas)</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-5 w-5 text-rose-400" />
                    <span>{destination.duration}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="mb-6 text-2xl font-bold">Sobre este destino</h2>
                <p className="text-lg leading-relaxed text-gray-600">
                  {destination.description}
                </p>
                <p className="mt-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </motion.section>

              {/* Gallery */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="mb-6 text-2xl font-bold">Galería</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {destination.gallery && destination.gallery.length > 0 ? (
                    destination.gallery.map((img, index) => (
                      <div
                        key={index}
                        className={`relative overflow-hidden rounded-xl ${
                          index === 0 ? "sm:col-span-2 sm:h-80" : "h-60"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 flex h-40 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
                      No hay imágenes adicionales disponibles
                    </div>
                  )}
                </div>
              </motion.section>

              {/* Reviews */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-6 text-2xl font-bold">Opiniones</h2>
                <div className="space-y-6">
                  {destination.reviews && destination.reviews.length > 0 ? (
                    destination.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="rounded-xl border p-6 shadow-sm"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-500">
                              {review.user.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold">{review.user}</p>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating
                                        ? "fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            Hace 2 meses
                          </span>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">
                      Aún no hay opiniones para este destino.
                    </p>
                  )}
                </div>
              </motion.section>
            </div>

            {/* Sidebar / Booking Card */}
            <div className="relative lg:col-span-1">
              <div className="sticky top-24">
                <div className="rounded-2xl border bg-white p-6 shadow-xl">
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-rose-500">
                      {destination.price}
                    </span>
                    <span className="text-gray-500"> / persona</span>
                  </div>

                  <div className="mb-6 space-y-4">
                    <div className="rounded-lg border p-3">
                      <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">
                        Fechas
                      </label>
                      <div className="font-medium">Seleccionar fechas</div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <label className="mb-1 block text-xs font-semibold uppercase text-gray-500">
                        Viajeros
                      </label>
                      <div className="font-medium">2 Adultos</div>
                    </div>
                  </div>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Cancelación gratuita</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Confirmación inmediata</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      <span>Seguro de viaje incluido</span>
                    </div>
                  </div>

                  <Button className="w-full bg-rose-500 py-6 text-lg hover:bg-rose-600">
                    Reservar ahora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
