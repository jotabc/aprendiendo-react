import { FILTERS_BUTTONS } from '../consts'
import { type FiltersValue } from '../types'

interface Props {
  filterSelected: FiltersValue
  onFilterChange: (filter: FiltersValue) => void
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  return (
    <ul className='filters' style={{ position: 'inherit' }}>
      {Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = key === filterSelected
        const className = isSelected ? 'selected' : ''

        return (
          <li key={href}>
            <a
              className={className}
              href={href}
              onClick={(e) => {
                e.preventDefault()
                onFilterChange(key as FiltersValue)
              }}
            >
              {literal}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
