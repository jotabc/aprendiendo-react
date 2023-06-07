import { API_USERS } from '../consts'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchUsers ({ pageParam = 1 }: { pageParam?: number}) {
  return await fetch(`${API_USERS}&page=${pageParam}`)
    .then(async res => {
    // forma correcta de manejar los errores cuando usamos fetch
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then(res => {
      const currentPage = Number(res.info.page)
      // Para tener 3 páginas por ejem.|
      const nextCursor = currentPage > 3 ? undefined : currentPage + 1

      return {
        users: res.results,
        nextCursor
      }
    })
}

export async function postUser (user: any) {
  return console.log(`El usuario añadido es ${JSON.stringify(user)}`)
}
