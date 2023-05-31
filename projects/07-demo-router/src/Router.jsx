import { useEffect, useState } from 'react'
import { EVENTS } from '../const'
import { match } from 'path-to-regexp'

export function Router ({ routes = [], defaultComponent: DefaultComponent = () => null }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    // una buena práctica es siempre crear la función para el listener porque así nos seguramos que donde le pasemos siempre tenga la misma referencia y es una forma que podemos asegurarnos que le quitamos el evento después.
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    // pushstate evento que escucha la navegación para adelante con la flecha de navegador.
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    // popstate evento que escihca escucha la navegación hacia atrás con la flecha de navegador. o el window.back
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])
  let routesParams = {}

  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true
    // usamos match de path-to-regexp para poder detectar las rutas dinámicas
    const matchedUrl = match(path, { decode: decodeURIComponent })
    const matched = matchedUrl(currentPath)
    if (!matched) return false

    // guradamos los parámetros de la url que eran dinámicos ejm si la ruta es /search/:quesry y la url es /search/javascript matched.param sería query === 'javascript'
    routesParams = matched.params
    return true
  })?.Component

  return Page
    ? <Page routesParams={routesParams} />
    : <DefaultComponent />
}
