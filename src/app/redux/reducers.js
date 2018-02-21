import { actionTypes } from './actions';

const initialPostsState = {
  posts: null
};

export function posts(state = initialPostsState, action) {
  switch (action.type) {
    case actionTypes.posts.POSTS_LOADED:
      return {
        ...state,
        posts: action.posts
      }
    
    case actionTypes.posts.POST_VALIDATION_ERROR:
      return {
        ...state,
        'error': action.error
      };

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
  error: null,
  userVotes: {},
  userSaved: {},
  userHidden: {}
};

export function user(state = initialUsersState, action) {
  let newState = {};

  switch (action.type) {

    case actionTypes.user.USER_VOTES_LOADED:
      let votes = {};
      action.userVotes.map((vote) => {
        votes[vote.post_id] = vote.vote;
      })
      return {
        ...state,
        userVotes: votes
      }

    case actionTypes.user.USER_VOTED:
      newState = { ...state };
      newState.userVotes[action.postId] = action.voteValue
      return newState;

    case actionTypes.user.USER_HID_POST:
      newState = { ...state };
      newState.userHidden[action.postId] = action.postId;
      return newState;

    case actionTypes.user.USER_SAVED_POST:
      newState = { ...state };
      console.log(newState);
      newState.userSaved[action.postId] = action.postId;
      return newState;

    case actionTypes.user.USER_AUTH_SUCCESS:
      return {
        ...state,
        username: action.username,
        uid: action.uid,
        authed: true,
        token: action.token
      };

    case actionTypes.user.USER_AUTH_FAILURE:
      return {
        ...state, // todo
        error: action.error
      };

    case actionTypes.user.USER_IS_AUTHING:
      return {
        ...state // todo
      };

    case actionTypes.user.USER_LOGGING_OUT:
      return {
        ...state,
        username: '',
        uid: '',
        authed: false,
        token: ''
      };

    case actionTypes.user.USER_IS_REGISTERING:
      return {
        ...state
      };

    case actionTypes.user.USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        username: action.user.username,
        uid: action.user.uid,
        authed: true,
        token: action.token
      };

    case actionTypes.user.USER_REGISTRATION_FAILURE:
      return {
        ...state,
        error: action.error
      };

    default:
      return { ...state }
  }
}