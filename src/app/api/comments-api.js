const config = require('../../../config/config');
import { defaultGetOptions, defaultPostOptions, defaultPostHeaders } from './requestConfig';

export async function getComments(postId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/posts/${postId}/comments`, defaultGetOptions);
    return results.json();
  }
  catch (err) {
    console.log(err);
  }
}

export async function submitComment(postId, content) {
  try {
    const results = await fetch(`${config.BACKEND_API}/posts/${postId}/comments`, {
      headers: {
        ...defaultPostHeaders
      },
      method: 'POST',
      body: JSON.stringify({
        content
      })
    });
    return results.json();
  }
  catch (error) {
    console.log(error)
  }
}

export async function submitReply(postId, commentId, content) {
  try {
    const results = await fetch(`${config.BACKEND_API}/posts/${postId}/comments/${commentId}`, {
      headers: {
        ...defaultPostHeaders
      },
      method: 'POST',
      body: JSON.stringify({
        content
      })
    });
    return results.json();
  }
  catch (error) {
    console.log(error)
  }
}