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