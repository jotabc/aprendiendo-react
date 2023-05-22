import { useEffect, useState } from 'react'
import { CAT_PREFIX_URL } from '../../const'

export function useCatImage ({ fact }) {
  const [imgUrl, setImgUrl] = useState(null)

  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 1).join(' ')
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        setImgUrl(url)
      })
  }, [fact])

  return { imgUrl: `${CAT_PREFIX_URL}${imgUrl}` }
}
