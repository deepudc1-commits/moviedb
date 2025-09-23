import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  const { path, queryStringParameters, headers } = event;
  const tmdb_api_key = process.env.TMDB_API_KEY;

  // Construct the full URL for the TMDb API
  const api_url = new URL(`https://api.themoviedb.org${path.replace('/.netlify/functions/tmdb-proxy', '')}`);
  
  // Append query parameters from the frontend request
  Object.keys(queryStringParameters).forEach(key => api_url.searchParams.append(key, queryStringParameters[key]));
  
  try {
    const response = await fetch(api_url, {
      method: event.httpMethod,
      headers: {
        'Authorization': headers['authorization'], // Forward the Authorization header
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`TMDb API responded with status: ${response.status}`);
    }
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data from TMDb' })
    };
  }
};
