const config = require('../../../config/config');

import { defaultGetWithAuthOptions } from './requestConfig';

export async function getUserPosts(userId) {
  try {
    const response = await fetch(`${config.BACKEND_API}/users/${userId}/posts`, {
      ...defaultGetWithAuthOptions
    })

    return response.json();
  }
  catch (err) {
    console.log(err);
  }
}

export async function getUserComments() {
  // todo
}

export async function getUserVotes(userId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/users/${userId}/votes`, {
      ...defaultGetWithAuthOptions
    });
    return results.json();
  }
  catch (error) {
    console.warn(error);
  }
}

export async function getUserSavedPosts(userId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/users/${userId}/savedPosts`, {
      ...defaultGetWithAuthOptions
    });
    return results.json();
  }
  catch (error) {
    console.warn(error);
  }
}

export async function getUserHiddenPosts(userId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/users/${userId}/hiddenPosts`, {
      ...defaultGetWithAuthOptions
    });
    return results.json();
  }
  catch (error) {
    console.warn(error);
  }
}