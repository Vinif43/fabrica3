import { Project } from '@/@types'
import { getProcet } from '@/services'
import { useQuery } from '@tanstack/react-query'

export function projectGet() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, isLoading, isError, refetch } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProcet,
  })

  console.log(data)
  console.log(error)

  const projects = data || []

  const projectsRefetch = () => {
    refetch()
  }

  return { projects, error, isLoading, isError }
}
