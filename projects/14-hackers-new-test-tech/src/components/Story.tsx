import useSwr from 'swr'
import { Link } from 'wouter'
import { getItemInfo } from '../services/hacker-news'
import {
  story,
  storyFooter,
  storyHeader,
  storyLink,
  storyTitle
} from './Story.css'
import { StoryLoader } from './StoryLoader'

export function Story (
  props: {
    id: number,
    index: number
  }
) {
  const { id, index } = props
  const { data, isLoading } = useSwr(`/story/${id}`, () => getItemInfo(id))

  if (isLoading) {
    return <StoryLoader />
  }

  const { by, kids, score, title, url } = data

  let domain = ''

  try {
    domain = new URL(url).hostname.replace('www.', '')
  } catch (error) {
    console.error(error)
  }

  // TODO: create relativeTime

  return (
    <article className={story}>
      <header className={storyHeader}>
        <small>{index + 1}.</small>
        <a
          className={storyTitle}
          target='_blank'
          href={url}
          rel='noopener noreferrer'
        >
          {title}
        </a>
        <a
          className={storyLink}
          target='_blank'
          href={url}
          rel='noopener noreferrer'
        >
          ({domain})
        </a>
      </header>
      <footer className={storyFooter}>
        <span>{score} points</span>
        <Link
          className={storyLink}
          href={`/article/${id}`}
        >
          {by}
        </Link>
        <Link
          className={storyLink}
          href={`/article/${id}`}
        >
          6 hours ago
        </Link>
        <Link
          className={storyLink}
          href={`/article/${id}`}
        >
          {kids?.length} comments
        </Link>
      </footer>
    </article>
  )
}
