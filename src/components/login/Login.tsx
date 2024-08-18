'use client'
import React from 'react'
import { FiUser } from 'react-icons/fi'
import { GoLock } from 'react-icons/go'
import Image from 'next/image'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginFormSchemaType, loginFormSchema } from './loginFormSchema'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'

export default function Login() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = async (data: LoginFormSchemaType) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        username: data.username,
        password: data.password,
      })

      if (res?.error) {
        console.log(res.error)
        toast.error('Nome de usário ou senha incorretos')
      } else {
        toast.success('Login realizado com sucesso')
        router.push('/students')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <main className="flex min-h-screen flex-col lg:flex-row  items-center justify-evenly p-10 md:p-24 bg-[#D9D9D9]">
      <div className="flex justify-center ">
        <Image
          src="/img/LOGO-ROXA-LETREIRO-HORIZONTAL.png"
          alt="Logo"
          width={400}
          height={147}
          className=""
        />
      </div>
      <div className=" w-full lg:w-1/3 lg:pt-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center xl:gap-10 gap-8 w-full"
        >
          <article className="relative w-full flex flex-col items-end gap-1">
            <input
              type="text"
              id="login"
              placeholder="Login"
              className="bg-white border-white border-2  text-lg  xl:pl-3 pl-16 py-5 rounded-lg w-full"
              {...register('username')}
            />
            <label htmlFor="login">
              <FiUser className="text-[#482DA5] text-3xl absolute top-5 xl:right-3 xl:left-auto left-6" />
            </label>
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </article>

          <article className="relative flex flex-col items-end xl:gap-2 gap-5 w-full">
            <div className="flex flex-col items-start gap-1 w-full">
              <input
                type="password"
                id="senha"
                placeholder="Senha"
                className="bg-white  border-white border-2 text-lg  xl:pl-3 pl-16 py-5 rounded-lg w-full"
                {...register('password')}
              />
              <label htmlFor="senha">
                <GoLock className="text-[#482DA5] text-3xl absolute top-5 xl:right-3 xl:left-auto left-6" />
              </label>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <a href="#" className="text-[#482DA5] text-lg">
              Esqueceu a senha?
            </a>
          </article>

          <button className="bg-[#482DA5] text-white text-xl font-bold py-5 px-20 xl:rounded-lg rounded-3xl shadow-md hover:bg-yellow-400 active:bg-yellow-500 duration-200">
            ENTRE
          </button>
        </form>
      </div>
    </main>
  )
}
