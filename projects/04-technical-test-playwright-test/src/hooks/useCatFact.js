import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState('lorem ipsum cat fact whatever')

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact))

    // async await
    // const newFact = await getRandomFact()
    // setFact(newFact)
  }

  useEffect(refreshFact, [])

  return {
    fact,
    refreshFact
  }
}
