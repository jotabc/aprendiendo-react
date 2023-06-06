import { useEffect, useState } from 'react'
import { type User } from './types.d'
import { UsersList } from './components/UsersList'
import { API } from './consts'

export function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState<boolean>(false)

  const toggleColors = () => {
    setShowColors(!showColors)
  }

  useEffect(() => {
    fetch(API)
      .then(async res => await res.json())
      .then(data => setUsers(data.results))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1>Lista de usuarios</h1>
      <header>
        <button onClick={toggleColors}>Colorear filas</button>
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </>
  )
}
