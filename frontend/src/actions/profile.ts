import { Post } from "../interfaces";

export const GET_POSTS = '[PROFILE] GET POSTS';
export const NEW_POST = '[PROFILE] NEW POST';
export const CLEAR_PROFILE = '[PROFILE] CLEAR';


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

export const clearProfileAction = () => {
  return {
    type: CLEAR_PROFILE
  }
}