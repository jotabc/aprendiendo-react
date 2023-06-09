import { FormEvent } from 'react'
import { FormInput, FormTextArea } from './components/Form'
import { Results } from './components/Results'
import { useComments } from './hooks/useComments'

export function App () {
  const { comments, error, isLoading, isLoadingMutation, mutate } = useComments()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const message = data.get('message')?.toString() ?? ''
    const title = data.get('title')?.toString() ?? ''

    if (title !== '' && message !== '') {
      mutate({ title, message })
    }
  }

  return (
    <>
      <header className='text-center text-3xl font-bold p-8 border-b'>
        <h1>Comments React Query</h1>
      </header>

      <main className='grid h-screen grid-cols-2'>
        <div className='col-span-1 p-8 bg-[#202b38]'>
          {isLoading && <strong>Cargando...</strong>}
          {error != null && <strong>Algo ha ido mal</strong>}
          <Results comments={comments} />
        </div>
        <div className='col-span-1 p-8 bg-black'>
          <form className={`${isLoadingMutation ? 'opacity-40' : ''} block max-w-xl px-4 m-auto`} onSubmit={handleSubmit}>
            <FormInput />
            <FormTextArea />
            <button
              disabled={isLoadingMutation}
              type='submit' className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
            >
              {isLoadingMutation ? 'Añadiendo comentario...' : 'Añadir comentario'}
            </button>
          </form>
        </div>
      </main>

    </>
  )
}
