import axios from 'axios'
import { getSession } from 'next-auth/react'

export const baseUrl = 'http://127.0.0.1:8000'

export const getProject = async () => {
  const session = await getSession()
  const token = session?.user?.access
  console.log(token)
  const response = await axios.get(`${baseUrl}/projetos/`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  console.log(response.data)
  return response.data
}

export const getStudent = async () => {
  const session = await getSession()
  const token = session?.user?.access
  console.log(token)
  const response = await axios.get(`${baseUrl}/api/imersionistas/`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

export const getPresences = async () => {
  const session = await getSession()
  const token = session?.user?.access
  console.log(token)
  const response = await axios.get(`${baseUrl}/api/presencas/`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}
