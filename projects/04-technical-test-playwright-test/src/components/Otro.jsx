import { useCatImage } from '../hooks/useCatImgae'

export function Otro () {
  const { imgUrl } = useCatImage({ fact: 'cat' })
  return (
    <div style={{ marginBottom: '8px' }}>
      {imgUrl && <img src={imgUrl} />}
    </div>
  )
}
