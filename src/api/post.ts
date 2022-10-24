import axios from 'axios'

export function getPosts(params: PostInterface.ListRequest) {
  const { current, pageSize, text = '' } = params
  return axios.get('/posts', {
    params: {
      current,
      pageSize,
      text
    }
  })
}

export function addPost(body: PostInterface.AddItem) {
  const { title, content } = body
  return axios.post('/posts', {
    title,
    content
  })
}

export function updatePost(body: PostInterface.AddItem) {
  const { title, content, id } = body
  return axios.put('/posts', {
    title,
    content,
    id
  })
}

export function getPost(params: any) {
  const { id } = params
  return axios.get(`/posts/${id}`)
}

export function deletePost(params: PostInterface.DelItem) {
  const { id } = params
  return axios.delete(`/posts/${id}`)
}