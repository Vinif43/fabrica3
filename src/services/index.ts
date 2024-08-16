import axios from 'axios'
import { getSession } from 'next-auth/react'

export const getProcet = async () => {
  const session = await getSession()
  const token = session?.user?.token
  const response = await axios.get('http://127.0.0.1:8000/projetos/', {
    headers: { Authorization: `Token ${token}` },
  })

  console.log(response.data)
  return response.data
}
