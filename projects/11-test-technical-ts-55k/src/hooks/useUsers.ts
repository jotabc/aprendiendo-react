import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchUsers, postUser } from '../services/users'
import { type User } from '../types.d'

interface Props {
  nextCursor?: number,
  users: User[]
}

export function useUsers () {
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<Props>(
    ['users'], // <- key de la información o query
    fetchUsers, // <- como tiene que traer la información, y así tenemos acceso a la variable que le podemos pasar a la función para que nos retorne el parámetro de la paǵina.
    {
      // Podemos sacar el numero de pagina de donde queramos, de la url, localStorage etc.
      // lastPage => tiene la ultima página que hemos recibido es la respuesta de la última página que ha cargado. en el last page tenemos lo que esta retornando la funcion fetchUsers.
      // pages => todas las páginas que se ha descargado
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      refetchOnWindowFocus: false, // => esto desactiva que cuando vamos a otra página y volvemos a nuestra app evita que se haga un fetch.
      staleTime: 1000 * 3 // => con esto le decimos que cuanto tiempo queremos esperar para que los datos sean viejos, es decir, pasan por ejm 2 días y los datos son viejos.
    }
  )

  const users: User[] = data?.pages?.flatMap(page => page.users) ?? []
  const queryClient = useQueryClient()

  const { mutate, isLoading: isLoadingMutation } = useMutation({
    // la función a ejecutarse cuando queremos que haga la mutación.
    mutationFn: postUser,
    // se hace antes de llegar al db.
    onMutate: async (newUser) => {
      // cancelamos el refetching de datos para esperar después de la mutación.
      await queryClient.cancelQueries(['users']) // <- para cancelar la query que se está ejecutando.
      // Esto lo hacemos para obtener el estado anterior y poder hacer un rollback. leemos cache.
      const previousUsers = queryClient.getQueryData(['users'])

      queryClient.setQueryData(['users'], (oldData: any) => {
        const newUserToAdd = structuredClone(newUser)
        newUserToAdd.preview = true

        return [...oldData, newUser]
      })

      return { previousUsers } // <== context que llega al onError.
    },
    onError: (error, variables, context) => {
      console.error(error)
      if (context?.previousUsers !== null) {
        // vuelve a poner los comentarios anteriores en la cache si ha habido un error (actualización optimista)
        queryClient.setQueryData(['comments'], context?.previousUsers)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users']
      })
    },
    onSuccess: async (newUser) => {
      // forma de volver a actualizar el estado para que se vean los cambios en la UI.
      /* 1) Actualizar el cache de react-query manualemente, con esto evitamos hacer un refresh de datos.
      await queryClient.setQueryData(['users'], (oldData?: any) => {
        if (oldData == null) return [newUser]
        return [...oldData, newUser]
      }) */

      /* 2) Hacer otra vez un refetch de la query
      await queryClient.invalidateQueries({
        queryKey: ['users']
      }) */

      /* 3) Actualizaciones optitmistas arriba onMutate, onError, onSettled */
    }
  })

  return {
    users,
    refetch,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    mutate,
    isLoadingMutation
  }
}
