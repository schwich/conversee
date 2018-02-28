const config = require('../../../config/config');

export async function getComments(postId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/posts/${postId}/comments`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    return results.json();
  }
  catch (err) {
    console.log(err);
  }
}