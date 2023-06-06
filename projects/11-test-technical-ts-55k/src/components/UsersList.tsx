import { type User } from '../types.d'

interface Props {
  showColors: boolean;
  users: User[]
}

export function UsersList ({ showColors, users }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <td>Foto</td>
          <td>Nombre</td>
          <td>Apellido</td>
          <td>País</td>
          <td>Acciones</td>
        </tr>
      </thead>

      <tbody>
        {
          users.map((user, index) => {
            const backgroundColor = index % 2 === 0 ? '#333' : '#555'
            const color = showColors ? backgroundColor : 'transparent'

            return (
              <tr key={index} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt={user.name.first} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button>Borrar</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
