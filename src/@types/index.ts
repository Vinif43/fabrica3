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

export type Student = {
  id: number
  nome: string
  email: string
  rgm: string
  turma: number
}

export interface Presence {
  id: number
  data: string
  situacao: string
  aluno: number
}

export type ReactQueryProviderProps = {
  children: ReactNode
}
