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
  authed: false
}

export function users(state = initialUsersState, action) {
  switch (action.type) {
    case actionTypes.user.USER_AUTH_SUCCESS:
      return {
        ...state,
        username: action.user.username,
        uid: action.user.uid,
        authed: true,
        token: action.token
      }

    case actionTypes.user.USER_AUTH_FAILURE:
      console.log('user auth error');
      console.log(action.error);
      return {
        ...state // todo
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

    default:
      return { ...state }
  }
}