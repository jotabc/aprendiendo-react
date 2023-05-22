const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

// mala práctica, este código funciona pero no está correcto, hay que evitar el paso del setState hacia afuera, el setState es una cosa interna del componente.
// export const getRandomFact = (setFact) => {
//   fetch(CAT_ENDPOINT_RANDOM_FACT)
//     .then(res => res.json())
//     .then(data => {
//       const { fact } = data
//       setFact(fact)
//     })
// }

// mejor práctica al nosotros devolver retornar la funcion o fetch y retornar el fact estamos retornando la promesa de la función.
export const getRandomFact = () => {
  return fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then(res => res.json())
    .then(data => {
      const { fact } = data
      return fact
    })
}

// async await
// export const getRandomFact = async () => {
//   const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
//   const data = await res.json()
//   const {fact}  = data
//   return fact
// }

// split
/* const threeWords = json.fact.split(' ').slice(0, 3).join(' ')
  const threeWords = json.fact.split(' ', 3).join(' ')
  const firstWord = json.fact.split(' ')[0] */
