import axios from 'axios'
import type { AxiosRequestConfig } from "axios";

export async function getPosts(params: PostInterface.ListRequest): Promise<PostInterface.ListResponsed> {
  const { current, pageSize, text = '' } = params

  let res = await axios.get<PostInterface.ListRequest, AxiosRequestConfig<PostInterface.ListResponsed>>('/posts', {
    params: {
      current,
      pageSize,
      text
    }
  })
  let data = <PostInterface.ListResponsed>res.data
  return data
}

export async function addPost(body: PostInterface.AddItem): Promise<PostInterface.AddResponsed> {
  const { title, content } = body
  let res = await axios.post<PostInterface.AddItem, AxiosRequestConfig<PostInterface.AddResponsed>>('/posts', {
    title,
    content
  })

  let data = <PostInterface.AddResponsed>res.data
  return data
}

export async function updatePost(body: PostInterface.AddItem): Promise<PostInterface.AddResponsed> {
  const { title, content, id } = body
  let res = await axios.put<PostInterface.AddItem, AxiosRequestConfig<PostInterface.AddResponsed>>('/posts', {
    title,
    content,
    id
  })
  let data = <PostInterface.AddResponsed>res.data
  return data
}

export function getPost(params: any) {
  const { id } = params
  return axios.get(`/posts/${id}`)
}

export async function deletePost(params: PostInterface.DelItem): Promise<PostInterface.DelResponsed> {
  const { id } = params
  let res = await axios.delete<PostInterface.DelItem, AxiosRequestConfig<PostInterface.DelResponsed>>(`/posts/${id}`)
  let data = <PostInterface.DelResponsed>res.data
  return data
}