import useeSWRInfinite from 'swr/infinite'
import { getTopStories } from '../services/hacker-news'
import { Story } from '../components/Story'
import { useEffect, useRef } from 'react'

export default function TopStoriesPage () {
  // const { data, error } = useSwr('stories', () => getTopStories(1, 10))

  const { data, isLoading, size, setSize } = useeSWRInfinite(
    (index) => `stories/${index + 1}`,
    (key) => {
      const [, page] = key.split('/')
      return getTopStories(Number(page), 5)
    }
  )

  const stories = data?.flat()
  const chivatoEl = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // use intersecction observer to detect end ofe the page scroll

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setSize(prevState => prevState + 1)
      }
    })

    if (chivatoEl.current == null) { return }

    observer.observe(chivatoEl.current)

    return () => {
      observer.disconnect()
    }
  }, [isLoading, setSize])

  return (
    <>
      <ul>
        {stories?.map((id: number, index: number) => (
          <li key={id}>
            <Story id={id} index={index} />
          </li>
        ))}
      </ul>

      {!isLoading && <span ref={chivatoEl}>.</span>}

      {/* <button
        style={{ marginBottom: '1rem' }}
        onClick={() => setSize(size + 1)}
      >
        Load more
      </button> */}
    </>
  )
}
