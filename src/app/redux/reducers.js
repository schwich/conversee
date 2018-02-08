const initialPostsState = {
  hello: '',
  posts: null
}

export function posts(state = initialPostsState, action) {
  switch (action.type) {
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
  'users': null
}

export function users(state = initialUsersState, action) {
  switch (action.type) {
    default:
      return { ...state }
  }
}