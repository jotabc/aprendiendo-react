import { TODO_FILTERS } from './consts'

export interface Todo {
  id: string,
  title: string;
  completed: boolean;
}

// utilities types buena práctica nombrar también los parámetros
export type TodoId = Pick<Todo, 'id'>
export type TodoIdAndCompleted = Pick<Todo, 'id' | 'completed'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>

export type ListOfTodos = Todo[]

export type FiltersValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
