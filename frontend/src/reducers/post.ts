// @ts-nocheck
import { CREATE_COMMENT, GET_POST } from "../actions/post"
import { Post } from "../interfaces"

interface IState {
  post?: Post
}

const defaultState: IState = {}

export default (state = defaultState, action: Any) => {
  switch(action.type) {
    case GET_POST:
      return {
        post: action.payload
      }
    case CREATE_COMMENT:
      return {
        post: {
          ...state.post,
          comments: [
            action.payload,
            ...state.post?.comments,
          ]
        }
      }
    default:
      return state;
      break
  }
}