/* Importações */
'use client'
import { z } from 'zod'

/* Validação do dado colocado no campo */
export const loginFormSchema = z.object({
  username: z.string().min(1, 'O nome de usuário é obrigatório*'),
  password: z.string().min(1, 'A senha é obrigatória*'),
})

export type LoginFormSchemaType = z.infer<typeof loginFormSchema>
