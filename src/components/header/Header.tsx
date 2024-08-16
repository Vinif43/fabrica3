'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-purple-900 text-white font-semibold py-7 px-10">
      <img src="" alt="Logo" className="h-10 w-10" />
      <nav>
        <ul className="flex space-x-8">
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
