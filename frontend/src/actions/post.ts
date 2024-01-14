import { Post } from "../interfaces";

export const GET_POST = '[POSTS] GET POST';
export const CREATE_COMMENT = '[POSTS] CREATE COMMENT';


export const getPostAction = (post: Post) => {
  return {
    type: GET_POST,
    payload: post
  }
};

export const createCommentAction = (comment: any) => {
  return {
    type: CREATE_COMMENT,
    payload: comment
  }
}