'use client'
import { studentGet } from '@/hook/studentGet'
import { StudentsTable } from './StudentsTable'

export default function StudentsList() {
  const { students } = studentGet()

  return (
    <>
      <div className="py-24 flex flex-col justify-center items-center">
        <h1 className="font-bold text-purple-900 text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-4">
          Lista de presenças da turma
        </h1>
        <StudentsTable students={students} />
      </div>
    </>
  )
}
