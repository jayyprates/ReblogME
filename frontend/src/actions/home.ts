import { Post } from "../interfaces";

export const GET_POSTS = '[HOME] GET POSTS';
export const NEW_POST = '[HOME] NEW POST';


export const getPostsAction = (posts: Post[]) => {
  return {
    type: GET_POSTS,
    payload: {
      posts
    }
  }
};

export const newPostCreated = (post: Post) => {
  return {
    type: NEW_POST,
    payload: post
  }
}