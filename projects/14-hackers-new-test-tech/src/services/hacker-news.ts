export const getTopStories = async (page:number, limit: number) => {
  const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json')
  const json = await response.json()
  // page starts with 1 pagination manual
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const ids = json.slice(startIndex, endIndex)

  return ids

  // return await Promise.all(ids.map(id => getItemInfo(id)))
}

export const getItemInfo = async (id: number) => {
  const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  return await response.json()
}
