import { Presence } from '@/@types'
import { getPresences } from '@/services'
import { useQuery } from '@tanstack/react-query'

export function presenceGet() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, isLoading, isError, refetch } = useQuery<Presence[]>({
    queryKey: ['presences'],
    queryFn: getPresences,
  })

  const presences = data || []

  const presencesRefetch = () => {
    refetch()
  }

  return { presences, error, isLoading, presencesRefetch, isError }
}
