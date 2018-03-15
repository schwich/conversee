const config = require('../../../config/config');

export async function getAllPosts(activeTab) {
  try {
    const results = await fetch(`${config.BACKEND_API}/posts/${activeTab}`);
    return results.json();
  }
  catch (error) {
    console.warn(error);
  }
}

export async function getMorePosts(sortType, pageNum) {
  try {

    const results = await fetch(`${config.BACKEND_API}/posts/${sortType}/page/${pageNum}`)
    return results.json();
  } 
  catch (error) {
    console.log(error);
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
        owner: post.owner,
        type: post.type,
        tags: post.tags
      })
    });

    return response.json();

  }
  catch (error) {
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

  }
  catch (error) {
    console.warn(error);
  }
}

export async function unvote(postId, voteValue) {
  try {
    const response = await fetch(`${config.BACKEND_API}/posts/unvote`, {
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

  }
  catch (error) {
    console.warn(error);
  }
}

export async function hidePost(postId) {
  try {
    const response = await fetch(`${config.BACKEND_API}/posts/hide`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        postId,
        userId: localStorage.getItem('uid')
      })
    });

    return response.json();

  }
  catch (error) {
    console.warn(error);
  }
}

export async function savePost(postId) {
  try {
    const response = await fetch(`${config.BACKEND_API}/posts/save`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        postId,
        userId: localStorage.getItem('uid')
      })
    });

    return response.json();

  }
  catch (error) {
    console.warn(error);
  }
}

export async function unSavePost(postId) {
  try {
    const response = await fetch(`${config.BACKEND_API}/posts/unsave`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        postId,
        userId: localStorage.getItem('uid')
      })
    });

    return response.json();

  }
  catch (error) {
    console.warn(error);
  }
}

