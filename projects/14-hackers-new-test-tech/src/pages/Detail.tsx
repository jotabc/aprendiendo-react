import useSwr from 'swr'
import { getItemInfo } from '../services/hacker-news'
import { ListOfComments } from '../components/ListOfComments'

export default function DetailPage (
  props: {
    params: {
      id: string
    }
  }
) {
  const { params: { id } } = props
  const { data, isLoading } = useSwr(`/story/${id}`, () => getItemInfo(Number(id)))
  const commentsIds = data?.kids?.slice(0, 10) ?? []
  return (
    <div className=''>
      {isLoading
        ? <p>Loading...</p>
        : <ListOfComments ids={commentsIds} />}
    </div>
  )
}
