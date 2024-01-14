// @ts-nocheck
import { CLEAR_PROFILE, GET_POSTS, NEW_POST } from "../actions/profile"
import { Post } from "../interfaces"

interface IState {
  posts: Post[],
}

const defaultState: IState = {
  posts: [],
}

export default (state = defaultState, action: any) => {
  switch(action.type) {
    case GET_POSTS:
      return {
        posts: [...action.payload.posts, ...state.posts],
      }
    case NEW_POST:
      return {
        posts: [
          {
            ...action.payload,
            comments: []
          }, 
          ...state.posts]
      }
    case CLEAR_PROFILE:
      return defaultState;
    default:
      return state;
      break
  }
}