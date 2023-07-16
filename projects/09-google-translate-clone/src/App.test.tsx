import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('My App works as expected', async () => {
  // usuario inicializado de prueba. siempre tiene que ir antes del render.
  const user = userEvent.setup()

  const app = render(<App />)
  // obtenemos el elemento del DOM que queremos probar por placeholder
  const textareaFrom = app.getByPlaceholderText('Introducir texto')

  await user.type(textareaFrom, 'Hola mundo')
  // El findByDisplayValue busca un elemento que este en pantalla un input o un valor que contenga el text que le estamos pasando.
  // /Hello world/ esta regex hace que sea case insensitive.
  // i solo encuentra la ocurrencia con o sin puntos.
  const result = await app.findByDisplayValue(/Hello world/i, {}, { timeout: 5000 })
  expect(result).toBeTruthy()
})
