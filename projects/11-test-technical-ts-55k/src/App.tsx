import { useEffect, useMemo, useRef, useState } from 'react'
import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'
import { API_USERS } from './consts'

const fetchUsers = async (page: number) => {
  return await fetch(`${API_USERS}&page=${page}`)
    .then(async res => {
    // forma correcta de manejar los errores cuando usamos fetch
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then(res => res.results)
}

export function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.none)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const originalUsers = useRef<User[]>([])
  // useRef -> para guardar un valor
  // que queremos que se comparta entre renderizados
  // pero que al cambiar, no vuelva a renderizar el componente

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.none ? SortBy.country : SortBy.none
    setSorting(newSortingValue)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    setLoading(true)
    setError(false)

    fetchUsers(currentPage)
      .then(users => {
        setUsers(prevState => {
          const newUsers = prevState.concat(users)
          originalUsers.current = users
          return newUsers
        })
      })
      .catch(err => {
        // no sirve el error en el catch en el fetch si no tenemos un torw new error declarado arriba.
        setError(err)
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

  const filteredUsers = useMemo(() => {
    return filterCountry != null && filterCountry.length > 0
      ? users.filter(user => {
        return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      })
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.none) return filteredUsers

    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.country]: user => user.location.country,
      [SortBy.name]: user => user.name.first,
      [SortBy.last]: user => user.name.last
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  const handlePagination = () => {
    setCurrentPage(prevState => prevState + 1)
  }

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <header>
        <button onClick={toggleColors}>
          Colorear files
        </button>

        <button onClick={toggleSortByCountry}>
          {sorting === SortBy.country ? 'No ordenar por país' : 'Ordenar por país'}
        </button>

        <button onClick={handleReset}>
          Resetear estado
        </button>

        <input
          placeholder='Filtra por país' onChange={(e) => {
            setFilterCountry(e.target.value)
          }}
        />
      </header>
      <main>
        {users.length > 0 && (
          <UsersList
            changeSorting={handleChangeSort}
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
          />
        )}
        {loading && <p>Cargando...</p>}
        {!loading && error && <p>Hubo un error</p>}
        {!loading && !error && users.length === 0 && <p>No hay usuarios</p>}
        {!loading && !error && (
          <button
            onClick={handlePagination}
          >
            Cargar más resultados
          </button>
        )}
      </main>
    </div>
  )
}
