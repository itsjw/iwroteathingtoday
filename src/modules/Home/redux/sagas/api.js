export function getPosts () {
  return window.fetch('/posts.json')
    .then(response => {
      if (response.ok) return response.json()
      return []
    })
}
