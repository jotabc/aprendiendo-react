import { useReducer } from 'react'
import type { Action, State } from '../types'

// 1 Crear a initial state
const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

// 2 Crear un reducer
function reducer (state: State, action: Action) {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    return {
      ...state,
      fromLanguage: state.toLanguage,
      toLanguage: state.fromLanguage
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: ''
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: true,
      result: action.payload
    }
  }

  return state
}

export function useStore () {
  // 3 hook react
  const [state, dispatch] = useReducer(reducer, initialState)

  const changeSpanish = () => dispatch({ type: 'SET_FROM_LANGUAGE', payload: 'es' })

  return {
    changeSpanish
  }
}
