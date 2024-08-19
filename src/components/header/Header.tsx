'use client'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  function handleSignOut() {
    signOut({
      redirect: false,
    })

    router.push('/')
  }
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
              href="/acesso/students"
            >
              Realizar presença
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-purple-300 transition-colors"
              href="/acesso/presenca"
            >
              Presenças passadas
            </Link>
          </li>
          <li
            onClick={handleSignOut}
            className="hover:text-purple-300 text-red-500 transition-colors cursor-pointer"
          >
            Sair
          </li>
        </ul>
      </nav>
    </header>
  )
}
