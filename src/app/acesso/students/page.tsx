import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import StudentsList from '@/components/students/StudentsList'
import React from 'react'

export default function page() {
  return (
    <main className="bg-[#D9D9D9] min-h-screen flex flex-col justify-between">
      <Header />
      <StudentsList />
      <Footer />
    </main>
  )
}
