import useSwr from 'swr'
import { getItemInfo } from '../services/hacker-news'
import { CommentLoader } from './CommentLoader'
import { getRelativeTime } from '../utils/getRelativeTime'

function Comment (props: { id: number }) {
  const { id } = props
  const { data, isLoading } = useSwr(`/comment/${id}`, () => getItemInfo(id))

  if (isLoading) {
    return <CommentLoader />
  }

  const { by, text, time, kids } = data
  const relativeTime = getRelativeTime(time)

  return (
    <>
      <details open>
        <summary>
          <small>
            <span>{by}</span>
            <span> - </span>
            <span>
              <time dateTime={new Date(time * 1000).toISOString()}>
                {relativeTime}
              </time>
            </span>
          </small>
        </summary>
        <p>{text}</p>
      </details>
      {kids?.length > 0 && <ListOfComments ids={kids.slice(0, 10)} />}
    </>
  )
}

export function ListOfComments (
  props: { ids: number [] }
) {
  const { ids } = props
  return (
    <ul>
      {ids.map((id: number) => (
        <li key={id}>
          <Comment id={id} />
        </li>
      ))}
    </ul>
  )
}
