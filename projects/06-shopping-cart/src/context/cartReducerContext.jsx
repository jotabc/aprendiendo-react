import { createContext, useReducer } from 'react'
import { CART_ACTION_TYPES, cartInitialState, cartReducer } from '../reducer/cartReducer'

export const CartContextReducer = createContext()

export const CartProviderReducer = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = product => dispatch({
    type: CART_ACTION_TYPES.ADD_TO_CART,
    payload: product
  })

  const clearCart = _ => dispatch({
    type: CART_ACTION_TYPES.CLEAR_CART
  })

  const removeToCart = product => dispatch({
    type: CART_ACTION_TYPES.REMOVE_TO_CART,
    payload: product
  })

  return (
    <CartContextReducer.Provider value={{
      addToCart,
      cart: state,
      clearCart,
      removeToCart
    }}
    >
      {children}
    </CartContextReducer.Provider>
  )
}
