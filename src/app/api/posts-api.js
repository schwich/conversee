const config = require('../../../config/config');

export async function getAllPosts() {
  try {
    const results = await fetch(`${config.BACKEND_API}/posts`);
    return results.json();
  }
  catch (error) {
    console.warn(error);
  }
}

export async function getUserVotes(userId) {
  try {
    const results = await fetch(`${config.BACKEND_API}/users/${userId}/votes`);
    return results.json();
  }
  catch (error) {
    console.warn(error);
  }
}

export async function submitPost(post) {
  try {
    const response = await fetch(`${config.BACKEND_API}/posts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        title: post.title,
        link: post.link,
        content: post.content,
        owner: post.owner
      })
    });

    return response.json();

  } catch (error) {
    console.warn(error);
  }
}

export async function vote(postId, voteValue) {
  try {
    const response = await fetch(`${config.BACKEND_API}/posts/vote`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        postId,
        voteValue,
        userId: localStorage.getItem('uid')
      })
    });

    return response.json();

  } catch (error) {
    console.warn(error);
  }
}