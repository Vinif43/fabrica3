'use client'
import { studentGet } from '@/hook/studentGet'
import { StudentsTable } from './PresencaTable'
import { useState } from 'react'

export default function PresencaList() {
  const { students } = studentGet()

  const [search, setSearch] = useState('')
  const [date, setDate] = useState('')

  return (
    <>
      <div className="py-12 flex flex-col m-auto">
        <h1 className="font-bold text-purple-900 text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
          Lista de presenças da turma
        </h1>
        <div className="flex gap-x-2 py-2">
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
          />
        </div>
        <StudentsTable students={students} search={search} date={date} />
      </div>
    </>
  )
}
