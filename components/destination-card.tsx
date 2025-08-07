import Image from "next/image"
import { Clock, MapPin, Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface DestinationCardProps {
  destination: {
    id: number
    name: string
    image: string
    price: string
    rating: number
    duration: string
  }
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-bold">{destination.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{destination.rating}</span>
          </div>
        </div>
        <div className="mb-4 flex flex-wrap gap-2 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{destination.name.split(",")[0]}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{destination.duration}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-rose-500">{destination.price}</span>
            <span className="text-sm text-gray-500"> /persona</span>
          </div>
          <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
            Ver detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
