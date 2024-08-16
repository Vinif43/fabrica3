'use client'
import { projectGet } from '@/hook/projectGet'
import { LuCalendar } from 'react-icons/lu'

export default function ProjectCard() {
  const { projects } = projectGet()
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="overflow-hidden rounded-md border border-default-200 bg-white dark:bg-default-50"
        >
          <div className="flex items-center justify-between border-b border-default-200 px-4 py-3">
            <h5 className="text-lg text-default-900 font-bold">
              {project.nome}
            </h5>
            <div>
              <span className="rounded-md px-1.5 py-1 text-xs font-bold text-white bg-green-600">
                Concluido
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="px-6 py-3">
              <h5 className="my-2">
                <p role="button" className="text-default-900">
                  Fabrica
                </p>
              </h5>
              <p className="mb-9 text-sm text-default-500">
                {project.descricao}
              </p>
              <div className="flex -space-x-2">
                {/* {images.map((image, idx) => (
                  <span role="button" key={idx}>
                    <Image
                      className="inline-block size-12 rounded-full border-2 border-default-50"
                      src={image}
                      alt="Image Description"
                    />
                  </span>
                ))} */}
                {/* {text && (
                  <span>
                    <div className="relative inline-flex">
                      <button className="inline-flex size-12 items-center justify-center rounded-full border-2 border-white bg-default-200 align-middle text-sm font-medium text-default-700 shadow-sm transition-all hover:bg-default-300 dark:border-default-50">
                        <span className="font-medium leading-none">{text}</span>
                      </button>
                    </div>
                  </span>
                )} */}
              </div>
            </div>
            <div className="border-t border-default-200 p-5">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="flex items-center text-sm">
                    <LuCalendar className="me-2 text-lg" />
                    <span className="align-text-bottom">
                      {project.data_inicio.split('T')[0] || 'N/A'}
                    </span>
                  </span>
                  {/* <span className="flex items-center text-sm">
                    <LuAlignJustify className="me-2 text-lg" />
                    <span className="align-text-bottom">pular</span>
                  </span>
                  <span className="flex items-center text-sm">
                    <LuMessageSquare className="me-2 text-lg" />
                    <span className="align-text-bottom">testar</span>
                  </span> */}
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-full rounded-full bg-default-200">
                    {/* <div className={cn(progressClassName, 'h-1.5 rounded-full')} /> */}
                  </div>
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
