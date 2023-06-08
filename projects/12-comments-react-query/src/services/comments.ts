
export async function getComments () {
  const API_KEY = '$2b$10$qzRNTwUtT1GYuNSFtZOOAObcX5FN/iB4dSHahEhnCILqTCv91DfOe'
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
