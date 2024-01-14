import http from './http';

export const getPosts = (offset = 0, limit = 10) => {
  return http.get("/post", { params: { offset, limit }});
}

export const getPost = (id: number | string) => {
  return http.get(`/post/${id}`);
}

export const createPost = (content: string) => {
  return http.post("/post", { content });
}

export const createComment = (id: string | number, content: string) => {
  return http.post(`/post/${id}/comment`, { content });
}

export const getProfilePost = (username: string) => {
  return http.get(`/post/profile/${username}`);
}