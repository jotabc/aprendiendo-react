import { Link } from '../Link'
import { useI18n } from '../hooks/useI18n'

console.log('About.jsx')
export function AboutPage ({ routesParams }) {
  const i18n = useI18n(routesParams.lang || 'es')
  return (
    <>
      <h2>{i18n.title}</h2>
      <p>{i18n.description}</p>
      <Link to='/'>Ir a la Home</Link>
    </>
  )
}
