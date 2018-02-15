import { actionTypes } from './actions';

const initialPostsState = {
  hello: '',
  posts: null
}

export function posts(state = initialPostsState, action) {
  switch (action.type) {
    case actionTypes.posts.POSTS_LOADED:
      return {
        ...state,
        'posts': action.posts
      }
    case 'HELLO_WORLD':
      return {
        ...state,
        'hello': action.text
      }

    default:
      return {
        ...state
      }
  }
}

const initialUsersState = {
  username: '',
  uid: '',
  authed: false,
  error: null
}

export function user(state = initialUsersState, action) {
  switch (action.type) {

    case actionTypes.user.USER_AUTH_SUCCESS:
      return {
        ...state,
        username: action.username,
        uid: action.uid,
        authed: true,
        token: action.token
      }

    case actionTypes.user.USER_AUTH_FAILURE:
      return {
        ...state, // todo
        error: action.error
      }

    case actionTypes.user.USER_IS_AUTHING:
      return {
        ...state // todo
      }

    case actionTypes.user.USER_LOGGING_OUT:
      return {
        ...state,
        username: '',
        uid: '',
        authed: false,
        token: ''
      }

    case actionTypes.user.USER_IS_REGISTERING:
      return {
        ...state
      }

    case actionTypes.user.USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        username: action.user.username,
        uid: action.user.uid,
        authed: true,
        token: action.token
      }

    case actionTypes.user.USER_REGISTRATION_FAILURE:
      return {
        ...state,
        error: action.error
      }

    default:
      return { ...state }
  }
}