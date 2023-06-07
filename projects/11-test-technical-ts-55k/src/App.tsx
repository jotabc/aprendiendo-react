import { useMemo, useState } from 'react'
import { UsersList } from './components/UsersList'
import { SortBy, type User } from './types.d'
import { useUsers } from './hooks/useUsers'
import { Results } from './components/Results'

export function App () {
  const {
    users,
    refetch,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    mutate,
    isLoadingMutation
  } = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.none)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  const toggleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.none ? SortBy.country : SortBy.none
    setSorting(newSortingValue)
  }

  const handleReset = async () => {
    // setUsers(originalUsers.current)
    await refetch() // <- refetch es una función que se encarga de refrescar la información.
  }

  const handleDelete = (email: string) => {
    // const filteredUsers = users.filter((user) => user.email !== email)
    // setUsers(filteredUsers)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

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
    fetchNextPage()
    // setCurrentPage(prevState => prevState + 1) antes sin usar react-query
  }

  const handleAddUser = () => {
    const name = 'Jonnathan'
    const lastName = 'Baculima'
    const email = 'XXXXXXXXXXXXXXXXXXXXXX'
    const age = 28

    mutate({ name, lastName, email, age })
  }

  return (
    <div className='App'>
      <h1>Prueba técnica</h1>
      <Results />
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
        {isLoading && <p>Cargando...</p>}
        {!isLoading && isError && <p>Hubo un Error</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {!isLoading && !isError && hasNextPage && (
          <button
            onClick={handlePagination}
          >
            Cargar más resultados
          </button>
        )}
        {!isLoading && !isError && hasNextPage === false && <p>No hay más resultados</p>}
        <button
          disabled={isLoadingMutation}
          onClick={handleAddUser}
        >
          {isLoadingMutation ? 'Añadiendo usuario...' : 'Añadir un nuevo usuario'}
        </button>
      </main>
    </div>
  )
}
