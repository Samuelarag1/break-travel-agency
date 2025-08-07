import Image from "next/image"
import { Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface TestimonialProps {
  testimonial: {
    id: number
    name: string
    role: string
    content: string
    avatar: string
  }
}

export function Testimonial({ testimonial }: TestimonialProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="mb-6 text-gray-600">{testimonial.content}</p>
        <div className="flex items-center">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-4">
            <h4 className="font-bold">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
