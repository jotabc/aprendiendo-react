import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { FiltersProvider } from './context/filters'

const root = createRoot(document.getElementById('root'))

root.render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
)
