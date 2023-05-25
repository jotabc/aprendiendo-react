export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_TO_CART: 'REMOVE_TO_CART',
  CLEAR_CART: 'CLEAR_CART'
}

// update localStorage with state for cart
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const cartReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_ACTION_TYPES.ADD_TO_CART: {
      const productInCartIndex = state.findIndex(item => item.id === payload.id)
      if (productInCartIndex >= 0) {
        const newState = structuredClone(state)
        newState[productInCartIndex].quantity += 1
        updateLocalStorage(newState)
        return newState
      }

      const newState = [
        ...state,
        {
          ...payload, // product
          quantity: 1
        }
      ]
      updateLocalStorage(newState)
      return newState
    }

    case CART_ACTION_TYPES.CLEAR_CART: {
      updateLocalStorage(cartInitialState)
      return cartInitialState
    }

    case CART_ACTION_TYPES.REMOVE_TO_CART: {
      const newState = state.filter(item => item.id !== payload.id)
      updateLocalStorage(newState)
      return newState
    }
  }
}
