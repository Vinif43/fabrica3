'use client'
import { studentGet } from '@/hook/studentGet'
import { StudentsTable } from './PresencaTable'
import { useState } from 'react'

export default function PresencaList() {
  const { students } = studentGet()

  const [search, setSearch] = useState('')
  // data padrao ser dia 18/08/2024
  const [date, setDate] = useState('2024-08-19')

  return (
    <>
      <div className="py-12 flex flex-col m-auto">
        <h1 className="font-bold text-purple-900 text-center text-xl md:text-2xl lg:text-3xl xl:text-3xl mb-4">
          Lista de presenças da turma
        </h1>
        <div className="flex max-md:flex-col px-4 gap-2 py-2">
          <input
            type="text"
            placeholder="Pesquisar aluno"
            className="p-2 rounded-lg border border-purple-800"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="date"
            className="p-2 rounded-lg border border-purple-800"
            onChange={(e) => setDate(e.target.value)}
            defaultValue={date}
          />
        </div>
       <div className='px-4'>
       <StudentsTable students={students} search={search} date={date} />
       </div>
      </div>
    </>
  )
}
