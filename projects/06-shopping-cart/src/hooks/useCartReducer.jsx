import { useContext, useReducer } from 'react'
import { CartContextReducer } from '../context/cartReducerContext'
import { CART_ACTION_TYPES, cartInitialState, cartReducer } from '../reducer/cartReducer'

export function useCartReducer () {
  const context = useContext(CartContextReducer)
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  if (context === undefined) {
    throw new Error('useCartReducer muste be used within a CartContextProvider')
  }

  const addToCart = product => dispatch({
    type: CART_ACTION_TYPES.ADD_TO_CART,
    payload: product
  })

  const clearCart = _ => dispatch({
    type: CART_ACTION_TYPES.CLEAR_CART
  })

  const removeToCart = product => dispatch({
    type: CART_ACTION_TYPES.ADD_TO_CART,
    payload: product
  })

  return {
    addToCart,
    clearCart,
    cart: state,
    removeToCart
  }
}
