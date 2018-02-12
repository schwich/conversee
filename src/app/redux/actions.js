export const actionTypes = {
  posts: {
    POSTS_LOADED: 'POSTS_LOADED',
  },
  user: {
    USER_AUTH_SUCCESS: 'USER_AUTH_SUCCESS',
    USER_AUTH_FAILURE: 'USER_AUTH_FAILURE',
    USER_IS_AUTHING: 'USER_IS_AUTHING',
    USER_LOGGING_OUT: 'USER_LOGGING_OUT'
  }

}

export function sayHelloWorld(value) {
  return {
    type: 'HELLO_WORLD',
    text: value
  }
}

/* post actions START */

export function postsLoaded(posts) {
  return {
    type: actionTypes.posts.POSTS_LOADED,
    posts
  }
}

/* post actions END */

/* user actions START */

export function userIsAuthing() {
  return {
    type: actionTypes.user.USER_IS_AUTHING
  }
}

export function userAuthSuccess(user, token) {
  return {
    type: actionTypes.user.USER_AUTH_SUCCESS,
    user,
    token
  }
}

export function userAuthFailure(error) {
  return {
    type: actionTypes.user.USER_AUTH_FAILURE,
    error
  }
}

export function userLoggedOut() {
  return {
    type: actionTypes.user.USER_LOGGING_OUT
  }
}

/* user actions END */