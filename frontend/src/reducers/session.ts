import { SIGN_UP, LOG_IN, REFRESH, LOGOUT } from "../actions/session"

interface IState {
  username?: string,
  userId?: number,
  authenticated: boolean
}

const defaultState: IState = {
  authenticated: false
}

export default (state = defaultState, action: any) => {
  switch(action.type) {
    case SIGN_UP:
      return {
        username: action.payload.username,
        userId: action.payload.id,
        authenticated: true
      }
      break;
    case LOG_IN:
      return {
        username: action.payload.username,
        userId: action.payload.id,
        authenticated: true
      }
      break;
    case REFRESH:
      return {
        username: action.payload.username,
        userId: action.payload.id,
        authenticated: true
      }
      break;
    case LOGOUT:
      return defaultState;
    default:
      return state;
      break
  }
}