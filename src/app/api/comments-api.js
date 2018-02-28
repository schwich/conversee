const config = require('../../../config/config');
import {defaultGetOptions, defaultPostOptions, defaultPostHeaders} from './requestConfig';

export async function getComments(postId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/posts/${postId}/comments`, defaultGetOptions);
    return results.json();
  }
  catch (err) {
    console.log(err);
  }
}

export async function submitComment(postId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/posts/${postId}/comments`, {
      ...defaultPostHeaders,
      body: JSON.stringify({
        postId,

      })
    });
    return results.json();
  } 
  catch (error) {
    console.log(error)
  }
}

export async function submitReply(postId, commentId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/posts/${postId}/comments/${commentId}`, defaultPostOptions);
    return results.json();
  } 
  catch (error) {
    console.log(error)
  }
}