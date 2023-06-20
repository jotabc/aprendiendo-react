import useSwr from 'swr'
import { getItemInfo } from '../services/hacker-news'
import { ListOfComments } from '../components/ListOfComments'
import { useEffect } from 'react'

export default function DetailPage (
  props: {
    params: {
      id: string
    }
  }
) {
  const { params: { id } } = props
  const { data, isLoading } = useSwr(`/story/${id}`, () => getItemInfo(Number(id)))
  const { kids, title } : { kids: number[], title: string } = data ?? { kids: [], title: '' }
  const commentsIds = kids?.slice(0, 10) ?? []

  // more SEO
  useEffect(() => {
    document.title = `Hacker News - ${title}`
  }, [title])

  return (
    <div className=''>
      {isLoading
        ? <p>Loading...</p>
        : <ListOfComments ids={commentsIds} />}
    </div>
  )
}
