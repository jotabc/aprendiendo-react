import type { TodoId, TodoIdAndCompleted, Todo as TodoType } from '../types'

interface Props extends TodoType {
  onRemoveTodo: ({ id }: TodoId) => void;
  onToggleCompleted: ({ id, completed }: TodoIdAndCompleted) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveTodo, onToggleCompleted }) => {
  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompleted({
      id,
      completed: event.target.checked
    })
  }

  return (
    <>
      <div className='view'>
        <input
          className='toggle'
          checked={completed}
          type='checkbox'
          onChange={handleChangeCheckbox}
        />
        <label>{title}</label>
        <button className='destroy' onClick={() => onRemoveTodo({ id })} />
      </div>
    </>
  )
}
