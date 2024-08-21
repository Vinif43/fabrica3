'use client'
import { studentGet } from '@/hook/studentGet'
import { StudentsTable } from './StudentsTable'
import { useState } from 'react'

export default function StudentsList() {
  const [search, setSearch] = useState('')
  const { students } = studentGet()

  return (
    <>
      <div className="py-12 flex flex-col justify-center items-center max-w-[83rem] w-full m-auto">
        <h1 className="font-bold text-purple-900 text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
          Lista de presenças da turma
        </h1>
        <div className="py-2 max-w-[400px] w-full px-8 md:px-0">
          <input
            type="text"
            placeholder="Pesquisar aluno"
            className="p-2 rounded-lg border w-full border-purple-800"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <StudentsTable students={students} search={search} />
      </div>
    </>
  )
}
