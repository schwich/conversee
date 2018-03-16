const config = require('../../../config/config');
import queryString from 'query-string';

export async function tagSuggest(q) {
  try {
    const query = queryString.stringify({
      q
    })
    const results = await fetch(`${config.BACKEND_API}/tags/suggest?${query}`);
    return results.json();
  }
  catch (err) {
    console.log(err);
  }
}

export async function getPostsByTag(tagName) {
  try {
    const results = await fetch(`${config.BACKEND_API}/tags/${tagName}/posts`);
    return results.json();  
  } 
  catch (error) {
    console.log(error);
  }
}

export async function getMorePostsByTag(tagName, sortType, page) {
  try {
    const results = await fetch(`${config.BACKEND_API}/tags/${tagName}/posts/${sortType}/page/${page}`);
    return results.json();  
  } 
  catch (error) {
    console.log(error);
  }
}