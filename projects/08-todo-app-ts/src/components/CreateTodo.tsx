import { useState } from 'react'
import { TodoTitle } from '../types'

interface Props {
  saveTodo: (title: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={inputValue}
        className='new-todo'
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={() => null}
        placeholder='¿Qué quieres hacer?'
        autoFocus
      />
    </form>
  )
}
