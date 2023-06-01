import { Link } from '../Link'
import image from '../assets/404.avif'

export function Page404 () {
  return (
    <>
      <h1>This is not fine </h1>
      <Link to='/'>Volver a la ruta principal</Link>
      <img
        style={{ width: '100%', height: 'auto' }}
        src={image}
        alt='Image to page not found error 404'
      />
    </>

  )
}
