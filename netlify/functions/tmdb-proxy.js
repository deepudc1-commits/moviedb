import fetch from 'node-fetch';

exports.handler = async function(event, context) {
  const { path, queryStringParameters } = event;
  
  // Retrieve the API key from the new Netlify environment variable
  const tmdb_api_key = process.env.TMDB_API_KEY;

  // Construct the full URL for the TMDB V3 API
  const api_url = new URL(`https://api.themoviedb.org${path.replace('/.netlify/functions/tmdb-proxy', '')}`);
  
  // Append query parameters from the frontend request
  Object.keys(queryStringParameters).forEach(key => api_url.searchParams.append(key, queryStringParameters[key]));
  
  // Add the V3 API key as a query parameter
  api_url.searchParams.append('api_key', tmdb_api_key);
  
  console.log('Constructed TMDb URL:', api_url.href);
  
  try {
    const response = await fetch(api_url, {
      method: event.httpMethod,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'FilmsVaultApp/1.0',
      }
    });

    if (!response.ok) {
      console.error('TMDb API response not ok:', response.status, response.statusText);
      const errorBody = await response.text();
      console.error('TMDb Error Body:', errorBody);
      throw new Error(`TMDb API responded with status: ${response.status} - ${errorBody}`);
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
    console.error('Function execution error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to fetch data from TMDb: ${error.message}` })
    };
  }
};
