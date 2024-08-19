import { Student, Presence } from '@/@types' // Certifique-se de que o tipo Presence está definido
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
import { baseUrl } from '@/services'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { MdOutlineSpeakerNotes } from 'react-icons/md'

interface StudentsTableProps {
  students: Student[]
  date: string
  search: string
}

export function StudentsTable({ students, date, search }: StudentsTableProps) {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const { presences, presencesRefetch } = presenceGet()

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const handlePresenceChange = async (
    studentId: number,
    status: string,
    id: number,
  ) => {
    const session = await getSession()
    const token = session?.user?.access

    if (!token) {
      toast.error('Autenticação necessária para atualizar a presença.')
      return
    }

    try {
      await axios.patch(
        `${baseUrl}/api/presencas/${id}/`,
        {
          aluno: studentId,
          situacao: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      presencesRefetch()
      toast.success('Presença atualizada com sucesso!')
    } catch (error) {
      toast.error('Erro ao salvar a presença!')
    }
  }

  const handlePresenceChangePost = async (
    studentId: number,
    status: string,
  ) => {
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
      data: date,
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

  const filteredStudents = students
    .filter((student) =>
      student.nome.toLowerCase().includes(search.toLowerCase()),
    )
    .sort((a, b) => a.nome.localeCompare(b.nome))

  const renderPresenceStatus = (
    existingPresence: Presence | undefined,
    idstu: number,
  ) => {
    if (!existingPresence && date) {
      return (
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => handlePresenceChangePost(idstu, 'PR')}
            className="rounded-md flex justify-center items-center h-8 w-8 font-semibold text-white bg-green-500 hover:bg-green-600"
          >
            <FaCheck className="h-5 w-5" />
          </button>
          <button
            onClick={() => handlePresenceChangePost(idstu, 'JU')}
            className="rounded-md flex justify-center items-center h-8 w-8 font-semibold text-white bg-orange-500 hover:bg-orange-600"
          >
            <MdOutlineSpeakerNotes className="h-5 w-5" />
          </button>
          <button
            onClick={() => handlePresenceChangePost(idstu, 'AU')}
            className="rounded-md flex justify-center items-center h-8 w-8 font-semibold text-white bg-red-500 hover:bg-red-600"
          >
            <IoClose className="h-5 w-5" />
          </button>
        </div>
      )
    }

    if (!existingPresence) {
      return <div>?</div>
    }

    return (
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() =>
            handlePresenceChange(
              existingPresence!.aluno,
              'PR',
              existingPresence.id,
            )
          }
          className={`rounded-md flex justify-center items-center h-8 w-8 font-semibold text-white ${
            existingPresence.situacao === 'PR'
              ? 'bg-green-700  border border-white'
              : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={existingPresence.situacao === 'PR'}
        >
          <FaCheck className="h-5 w-5" />
        </button>
        <button
          onClick={() =>
            handlePresenceChange(
              existingPresence!.aluno,
              'JU',
              existingPresence.id,
            )
          }
          className={`rounded-md flex justify-center items-center h-8 w-8 font-semibold text-white ${
            existingPresence.situacao === 'JU'
              ? 'bg-orange-700 border-white border'
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
          disabled={existingPresence.situacao === 'JU'}
        >
          <MdOutlineSpeakerNotes className="h-5 w-5" />
        </button>
        <button
          onClick={() =>
            handlePresenceChange(
              existingPresence!.aluno,
              'AU',
              existingPresence.id,
            )
          }
          className={`rounded-md flex justify-center items-center h-8 w-8 font-semibold text-white ${
            existingPresence.situacao === 'AU'
              ? 'bg-red-700 border border-white'
              : 'bg-red-500 hover:bg-red-600'
          }`}
          disabled={existingPresence.situacao === 'AU'}
        >
          <IoClose className="h-5 w-5" />
        </button>
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className="p-4 space-y-4">
        {filteredStudents.map((student) => {
          const existingPresence = presences.find(
            (presence) =>
              presence.aluno === student.id && presence.data === date,
          )

          return (
            <div
              key={student.id}
              className="bg-purple-800 hover:bg-purple-600 transition-colors text-purple-200 p-4 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-bold">{student.nome} </h3>
              <p>RGM: {student.rgm}</p>
              <div className="mt-4">
                {renderPresenceStatus(existingPresence, student.id)}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <Table className="bg-purple-800 w-full text-purple-200 rounded-lg">
      <TableCaption>Lista de presença dos alunos.</TableCaption>
      <TableHeader>
        <TableRow className="font-bold text-white">
          <TableHead className="w-[100px]">Presença</TableHead>
          <TableHead className="text-left">Nome</TableHead>
          <TableHead className="text-right">RGM</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredStudents.map((student) => {
          const existingPresence = presences.find(
            (presence) =>
              presence.aluno === student.id && presence.data === date,
          )

          return (
            <TableRow key={student.id} className="text-center font-semibold">
              <TableCell className="font-medium">
                {renderPresenceStatus(existingPresence, student.id)}
              </TableCell>
              <TableCell className="text-left">{student.nome}</TableCell>
              <TableCell className="text-right">{student.rgm}</TableCell>
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
