import { Student } from '@/@types'
import { getStudent } from '@/services'
import { useQuery } from '@tanstack/react-query'

export function studentGet() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, isLoading, isError, refetch } = useQuery<Student[]>({
    queryKey: ['students'],
    queryFn: getStudent,
  })

  const students = data || []

  const studentsRefetch = () => {
    refetch()
  }

  return { students, error, isLoading, studentsRefetch, isError }
}
