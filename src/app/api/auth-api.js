const config = require('../../../config/config');

export async function loginUser(username, password) {
  try {
    const response = await fetch(`${config.BACKEND_API}/auth/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    return response.json();
  }
  catch (error) {
    throw error;
  }
}

export async function registerUser(username, password, email) {
  try {
    let response = null;
    if (email !== '') {
      response = await fetch(`${config.BACKEND_API}/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          email
        })
      });
    }
    else {
      response = await fetch(`${config.BACKEND_API}/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
    }

    return response.json();
  }
  catch (error) {
    throw error;
  }
}