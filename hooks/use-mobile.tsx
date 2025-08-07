"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Verificar inicialmente
    checkIfMobile()

    // Agregar event listener para cambios de tamaño
    window.addEventListener("resize", checkIfMobile)

    // Limpiar event listener
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return isMobile
}
