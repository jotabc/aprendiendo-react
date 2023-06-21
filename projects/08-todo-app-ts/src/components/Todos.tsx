import { Todo } from './Todo'

import type { TodoId, ListOfTodos, TodoIdAndCompleted } from '../types'

interface Props {
  todos: ListOfTodos;
  onToggleCompleted: ({ id, completed }: TodoIdAndCompleted) => void;
  onRemoveTodo: ({ id }: TodoId) => void;
}

// JSX.Element no lleva las props, este solo indica solo lo que va a devolver.
// React.FC este si recibe las props y es como la mejor manera de tipar a día de hoy.
export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompleted }) => {
  return (
    <ul className='todo-list'>
      {todos.map(todo => {
        const { completed, id, title } = todo

        return (
          <li key={id} className={`${completed ? 'completed' : ''}`}>
            <Todo
              onRemoveTodo={onRemoveTodo}
              onToggleCompleted={onToggleCompleted}
              key={id}
              id={id}
              title={title}
              completed={completed}
            />
          </li>
        )
      })}
    </ul>
  )
}
