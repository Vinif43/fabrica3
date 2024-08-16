'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-purple-900 text-white font-semibold text-sm md:text-base py-7 px-2 md:px-10">
      <img
        src="/img/branco-com-preenchimento.png"
        alt="Logo"
        className="h-10 w-10 object-contain"
      />
      <nav>
        <ul className="flex gap-2 md:space-x-8 text-center">
          <li>
            <Link
              className="hover:text-purple-300 transition-colors"
              href="/students"
            >
              Realizar presença
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-purple-300 transition-colors"
              href="/dashboard"
            >
              Presenças passadas
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
