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