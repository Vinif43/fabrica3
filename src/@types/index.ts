import { ReactNode } from 'react'

export type Project = {
  id: number
  nome: string
  descricao: string
  data_inicio: string
  data_prevista_fim: string
  data_fim: string
  membros: []
}

export type ReactQueryProviderProps = {
  children: ReactNode
}
