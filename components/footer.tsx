import Link from "next/link"
import { Facebook, Instagram, PalmtreeIcon, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center">
              <PalmtreeIcon className="h-8 w-8 text-rose-400" />
              <span className="ml-2 text-2xl font-bold">BREAK</span>
            </Link>
            <p className="mb-4 text-gray-400">
              Creamos experiencias de viaje inolvidables que te permiten desconectar y disfrutar al máximo.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Destinos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Playas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Montañas
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Ciudades
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Aventuras
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Experiencias culturales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Carreras
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Prensa
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Afiliados
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 transition-colors hover:text-rose-400">
                  Cancelaciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} BREAK Travel Agency. Todos los derechos reservados.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-sm text-gray-400 transition-colors hover:text-rose-400">
                Política de privacidad
              </Link>
              <Link href="#" className="text-sm text-gray-400 transition-colors hover:text-rose-400">
                Términos de servicio
              </Link>
              <Link href="#" className="text-sm text-gray-400 transition-colors hover:text-rose-400">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
