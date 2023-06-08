import { FormInput, FormTextArea } from './components/Form'
import { Results } from './components/Results'
import { useQuery } from '@tanstack/react-query'
import { getComments } from './services/comments'
import { CommentWithId } from './models'

export function App () {
  const { data: comments, isLoading } = useQuery<CommentWithId[]>({
    queryKey: ['comments'],
    queryFn: getComments
  })

  return (
    <>
      <header className='text-center text-3xl font-bold p-8 border-b'>
        <h1>Comments React Query</h1>
      </header>

      <main className='grid h-screen grid-cols-2'>
        <div className='col-span-1 p-8 bg-[#202b38]'>
          {isLoading ? 'Loading...' : <Results comments={comments} />}
        </div>
        <div className='col-span-1 p-8 bg-black'>
          <form>
            <FormInput />
            <FormTextArea />
            <button
              className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
              type='submit'
            >
              Añadir comentario
            </button>
          </form>
        </div>
      </main>

    </>
  )
}
