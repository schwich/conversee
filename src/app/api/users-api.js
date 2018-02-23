const config = require('../../../config/config');

export async function getUserVotes(userId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/users/${userId}/votes`);
    return results.json();
  }
  catch (error) {
    console.warn(error);
  }
}

export async function getUserSavedPosts(userId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/users/${userId}/savedPosts`);
    return results.json();
  }
  catch (error) {
    console.warn(error);
  }
}

export async function getUserHiddenPosts(userId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/users/${userId}/hiddenPosts`);
    return results.json();
  }
  catch (error) {
    console.warn(error);
  }
}