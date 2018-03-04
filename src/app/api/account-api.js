const config = require('../../../config/config');
import { defaultPostOptions, defaultGetWithAuthOptions } from './requestConfig';

export async function getUserSavedPosts(userId) {
  try {
    const response = await fetch(`${config.BACKEND_API}/account/getUserSavedPosts`, {
      ...defaultGetWithAuthOptions
    })

    return response.json();
  }
  catch (err) {
    console.log(err);
  }
}

export async function getUserSavedComments() {
  // todo
}

export async function getUserUpvoted() {
  // todo
}

export async function getUserDownvoted() {
  // todo
}

export async function getUserHiddenPosts(userId) {
  try {
    const response = await fetch(`${config.BACKEND_API}/account/getUserHiddenPosts`, {
      ...defaultGetWithAuthOptions
    })

    return response.json();
  }
  catch (err) {
    console.log(err);
  }
}