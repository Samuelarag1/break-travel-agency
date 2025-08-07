"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulación de envío
    setTimeout(() => {
      setIsLoading(false)
      setEmail("")
      toast({
        title: "¡Suscripción exitosa!",
        description: "Gracias por suscribirte a nuestro boletín.",
      })
    }, 1500)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-md flex-col space-y-4 sm:flex-row sm:space-x-2 sm:space-y-0"
    >
      <Input
        type="email"
        placeholder="Tu correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-white/10 text-white placeholder:text-gray-300 focus:border-rose-400 focus:ring-rose-400"
      />
      <Button type="submit" disabled={isLoading} className="bg-rose-500 hover:bg-rose-600">
        {isLoading ? (
          "Enviando..."
        ) : (
          <>
            Suscribirse <Send className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  )
}
