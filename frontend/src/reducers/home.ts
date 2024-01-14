import { GET_POSTS, NEW_POST } from "../actions/home"
import { Post } from "../interfaces"

interface IState {
  posts: Post[],
  offset: number,
  limit: number
}

const defaultState: IState = {
  posts: [],
  offset: 0,
  limit: 10
}

export default (state = defaultState, action: any) => {
  switch(action.type) {
    case GET_POSTS:
      return {
        posts: [...action.payload.posts, ...state.posts],
        offset: state.offset + 10
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
    default:
      return state;
      break
  }
}