export const actionTypes = {
  posts: {
    POSTS_LOADED: 'POSTS_LOADED',
    POST_VALIDATION_ERROR: 'POST_VALIDATION_ERROR'
  },
  user: {
    USER_VOTED: 'USER_VOTED',
    USER_HID_POST: 'USER_HID_POST',
    USER_SAVED_POST: 'USER_SAVED_POST',
    USER_AUTH_SUCCESS: 'USER_AUTH_SUCCESS',
    USER_AUTH_FAILURE: 'USER_AUTH_FAILURE',
    USER_IS_AUTHING: 'USER_IS_AUTHING',
    USER_LOGGING_OUT: 'USER_LOGGING_OUT',
    USER_IS_REGISTERING: 'USER_IS_REGISTERING',
    USER_REGISTRATION_SUCCESS: 'USER_REGISTRATION_SUCCESS',
    USER_REGISTRATION_FAILURE: 'USER_REGISTRATION_FAILURE',
    USER_VOTES_LOADED: 'USER_VOTES_LOADED',
  }

}

/* post actions START */

export function postsLoaded(posts) {
  return {
    type: actionTypes.posts.POSTS_LOADED,
    posts
  }
}

export function postValidationError(error) {
  return {
    error
  }
}

/* post actions END */

/* user actions START */

export function userIsAuthing() {
  return {
    type: actionTypes.user.USER_IS_AUTHING
  }
}

export function userAuthSuccess(uid, username, token) {
  return {
    type: actionTypes.user.USER_AUTH_SUCCESS,
    uid,
    username,
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

export function userIsRegistering() {
  return {
    type: actionTypes.user.USER_IS_REGISTERING
  }
}

export function userRegistrationSuccess(user, token) {
  return {
    type: actionTypes.user.USER_REGISTRATION_SUCCESS,
    user,
    token
  }
}

export function userRegistrationFailure(error) {
  return {
    type: actionTypes.user.USER_REGISTRATION_FAILURE,
    error
  }
}

export function userVotesLoaded(userVotes) {
  return {
    type: actionTypes.user.USER_VOTES_LOADED,
    userVotes
  }
}

export function userVoted(postId, voteValue) {
  return {
    type: actionTypes.user.USER_VOTED,
    postId,
    voteValue
  }
}

export function userHidPost(postId) {
  return {
    type: actionTypes.user.USER_HID_POST,
    postId
  }
}

export function userSavedPost(postId) {
  return {
    type: actionTypes.user.USER_SAVED_POST,
    postId
  }
}

/* user actions END */