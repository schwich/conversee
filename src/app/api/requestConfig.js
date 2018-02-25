export const defaultHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const defaultPostHeaders = {
  ...defaultHeaders,
  'Authorization': `Bearer ${window.localStorage.getItem('token')}`
}

export const defaultGetOptions = {
  headers: {
    ...defaultHeaders
  }
}

export const defaultGetWithAuthOptions = {
  headers: {
    ...defaultHeaders,
    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
  }
}

export const defaultPostOptions = {
  method: 'POST',
  headers: {
    ...defaultPostHeaders
  }
}