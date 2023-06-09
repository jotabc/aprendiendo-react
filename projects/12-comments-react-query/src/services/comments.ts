
const API_KEY = '$2b$10$qzRNTwUtT1GYuNSFtZOOAObcX5FN/iB4dSHahEhnCILqTCv91DfOe'

export async function getComments () {
  const response = await fetch('https://api.jsonbin.io/v3/b/64813fe38e4aa6225eaae2e8', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch comments')
  }

  const data = await response.json()
  return data.record
}

export async function createComment (comment: Comment) {
  const comments = await getComments()
  const id = crypto.randomUUID()
  const newComment = { id, ...comment }
  const commentsToSave = [...comments, newComment]

  const response = await fetch('https://api.jsonbin.io/v3/b/64813fe38e4aa6225eaae2e8', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': API_KEY
    },
    body: JSON.stringify(commentsToSave)
  })

  if (!response.ok) {
    throw new Error('Failed to post comment.')
  }

  return newComment
}
