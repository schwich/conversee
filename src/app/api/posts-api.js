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
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: post.title,
        link: post.link,
        content: post.content
      })
    });

    return response.json();

  } catch (error) {
    console.warn(error);
  }
}