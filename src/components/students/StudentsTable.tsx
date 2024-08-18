import { Student } from '@/@types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { presenceGet } from '@/hook/presenceGet'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { MdOutlineSpeakerNotes } from 'react-icons/md'

interface StudentsTableProps {
  students: Student[]
}

export function StudentsTable({ students }: StudentsTableProps) {
  // const baseUrl = process.env.NEXT_API_BASE_URL
  const baseUrl = 'http://127.0.0.1:8000'

  const [isMobile, setIsMobile] = useState(false)

  const { presences, presencesRefetch } = presenceGet()

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handlePresenceChange = async (studentId: number, status: string) => {
    // passar  data de hoje no brasileiro
    // const currentDate = new Date().toISOString().split('T')[0]
    const currentDate = new Date().toLocaleDateString('en-CA', {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    // mes dia ano

    console.log(currentDate)

    const presenceData = {
      aluno: studentId,
      data: currentDate,
      situacao: status,
    }

    const session = await getSession()
    const token = session?.user?.access

    try {
      await axios.post(`${baseUrl}/api/presencas/`, presenceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      presencesRefetch()
      toast.success('Presença atualizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar a presença!')
    }
  }

  const sortedStudents = students.sort((a, b) => a.nome.localeCompare(b.nome))

  if (isMobile) {
    // Exibir cards no celular
    return (
      <div className="p-4 space-y-4">
        {sortedStudents.map((student) => {
          const currentDate = new Date().toLocaleDateString('en-CA', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          const existingPresence = presences.find(
            (presence) =>
              presence.aluno === student.id && presence.data === currentDate,
          )

          return (
            <div
              key={student.id}
              className="bg-purple-800 hover:bg-purple-600 transition-colors text-purple-200 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold">{student.nome} </h3>
              <p>RGM: {student.rgm}</p>
              {/* <p>Turma: {student.turma}</p> */}
              <div className="mt-4">
                {existingPresence ? (
                  <span
                    className={`px-4 py-2 rounded-full text-white font-semibold ${
                      existingPresence.situacao === 'PR'
                        ? 'bg-green-500'
                        : existingPresence.situacao === 'JU'
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                    }`}
                  >
                    {existingPresence.situacao === 'PR'
                      ? 'Presente'
                      : existingPresence.situacao === 'JU'
                        ? 'Justificado'
                        : 'Ausente'}
                  </span>
                ) : (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePresenceChange(student.id, 'PR')}
                      className="flex flex-col items-center justify-center p-2 font-semibold text-white text-sm bg-green-500 rounded-lg"
                    >
                      <FaCheck className="inline-block mr-2" /> Presente
                    </button>
                    <button
                      onClick={() => handlePresenceChange(student.id, 'JU')}
                      className="flex flex-col items-center justify-center p-2 font-semibold text-white text-sm bg-orange-500 rounded-lg"
                    >
                      <MdOutlineSpeakerNotes className="inline-block mr-2" />{' '}
                      Justificado
                    </button>
                    <button
                      onClick={() => handlePresenceChange(student.id, 'AU')}
                      className="flex flex-col items-center justify-center p-2 font-semibold text-white text-sm bg-red-500 rounded-lg"
                    >
                      <IoClose className="inline-block mr-2" /> Ausente
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Table className="bg-purple-800 text-purple-200 rounded-lg">
      <TableCaption>Lista de presença dos alunos.</TableCaption>
      <TableHeader>
        <TableRow className="font-bold text-white">
          <TableHead className="w-[100px]">Presença</TableHead>
          <TableHead className="text-left">Nome</TableHead>
          <TableHead className="text-right">RGM</TableHead>
          {/* <TableHead className="text-right">Turma</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {sortedStudents.map((student) => {
          const currentDate = new Date().toLocaleDateString('en-CA', {
            timeZone: 'America/Sao_Paulo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
          const existingPresence = presences.find(
            (presence) =>
              presence.aluno === student.id && presence.data === currentDate,
          )

          return (
            <TableRow key={student.id} className="text-center font-semibold">
              <TableCell className="font-medium">
                {existingPresence ? (
                  <span
                    className={`px-4 py-2 rounded-full font-semibold text-white ${
                      existingPresence.situacao === 'PR'
                        ? 'bg-green-500'
                        : existingPresence.situacao === 'JU'
                          ? 'bg-orange-500'
                          : 'bg-red-500'
                    }`}
                  >
                    {existingPresence.situacao === 'PR'
                      ? 'Presente'
                      : existingPresence.situacao === 'JU'
                        ? 'Justificado'
                        : 'Ausente'}
                  </span>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4">
                    <button
                      onClick={() => handlePresenceChange(student.id, 'PR')}
                      className="rounded-md flex justify-center items-center h-8 w-8 font-semibold text-white bg-green-500"
                    >
                      <FaCheck className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handlePresenceChange(student.id, 'JU')}
                      className="rounded-md flex justify-center items-center h-8 w-8 font-semibold text-white bg-orange-500"
                    >
                      <MdOutlineSpeakerNotes className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handlePresenceChange(student.id, 'AU')}
                      className="rounded-md flex justify-center items-center h-8 w-8 font-semibold text-white bg-red-500"
                    >
                      <IoClose className="h-5 w-5" />
                    </button>
                  </div>
                )}
              </TableCell>
              <TableCell className="text-left">{student.nome}</TableCell>
              <TableCell className="text-right">{student.rgm}</TableCell>
              {/* <TableCell className="text-right">{student.turma}</TableCell> */}
            </TableRow>
          )
        })}
      </TableBody>
      <TableFooter className="text-white">
        <TableRow>
          <TableCell colSpan={2}>Total de alunos</TableCell>
          <TableCell className="text-right">{students.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
