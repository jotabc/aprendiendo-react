import { Form } from 'react-bootstrap'
import { FC } from 'react'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean,
  onChange: (value: string) => void,
  value: string
}

const commonStyles = { border: 0, height: '200px', resize: 'none' }

const getPlaceHolder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea: FC<Props> = ({ loading, value, onChange, type }) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#eee' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as='textarea'
      onChange={handleChange}
      placeholder={getPlaceHolder({ type, loading })}
      style={styles}
      value={value}
    />

  )
}
