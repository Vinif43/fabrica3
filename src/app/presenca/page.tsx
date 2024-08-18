import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import PresencaList from '@/components/presenca/PresencaList'
import React from 'react'

export default function page() {
  return (
    <main className="bg-[#D9D9D9] min-h-screen flex flex-col justify-between">
      <Header />
      <div className=" w-full m-auto max-w-[83rem] max-xl:p-2 ">
        <PresencaList />
      </div>
      <Footer />
    </main>
  )
}
