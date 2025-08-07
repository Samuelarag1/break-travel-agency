"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, PalmtreeIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container flex items-center justify-between px-4">
        <Link href="/" className="flex items-center">
          <PalmtreeIcon className={`h-8 w-8 ${isScrolled ? "text-rose-500" : "text-white"}`} />
          <span className={`ml-2 text-2xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>BREAK</span>
        </Link>

        <nav className="hidden items-center space-x-8 lg:flex">
          {["Destinos", "Ofertas", "Experiencias", "Sobre Nosotros", "Blog"].map((item) => (
            <Link
              key={item}
              href="#"
              className={`text-sm font-medium transition-colors hover:text-rose-500 ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center space-x-4 lg:flex">
          <Button
            variant={isScrolled ? "outline" : "ghost"}
            className={isScrolled ? "border-rose-500 text-rose-500" : "text-white hover:bg-white/20"}
          >
            Iniciar Sesión
          </Button>
          <Button className={isScrolled ? "bg-rose-500 hover:bg-rose-600" : "bg-white text-rose-500 hover:bg-white/90"}>
            Reservar Ahora
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          <Menu className={`h-6 w-6 ${isScrolled ? "text-gray-900" : "text-white"}`} />
        </Button>
      </div>

      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <PalmtreeIcon className="h-8 w-8 text-rose-500" />
                <span className="ml-2 text-2xl font-bold text-gray-900">BREAK</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Close menu">
                <X className="h-6 w-6" />
              </Button>
            </div>

            <nav className="mt-8 flex flex-col space-y-6">
              {["Destinos", "Ofertas", "Experiencias", "Sobre Nosotros", "Blog"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-lg font-medium text-gray-900 transition-colors hover:text-rose-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col space-y-4">
              <Button variant="outline" className="w-full border-rose-500 text-rose-500">
                Iniciar Sesión
              </Button>
              <Button className="w-full bg-rose-500 hover:bg-rose-600">Reservar Ahora</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
