import { useUsers } from '../hooks/useUsers'

export function Results () {
  const { users } = useUsers()
  return (
    <h3 className={`${users.preview === true ? 'bg-gray-500 text-white' : 'text-gray-500 bg-white'}`}>
      Results {users.length}
    </h3>
  )
}
