const initialState = {
  hello: '',
  posts: null
}

export function posts(state = initialState, action) {
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