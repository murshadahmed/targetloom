exports.handler = async (event) => {
  try {
    const params = event.queryStringParameters || {};
    const path = params.path;
    const qs = params.qs || '';
    if (!path) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing path parameter' }) };
    }
    const url = `https://www.cbioportal.org/api${path}${qs ? '?' + qs : ''}`;

    const fetchOptions = {
      method: event.httpMethod,
      headers: { 'Content-Type': 'application/json' }
    };
    if (event.httpMethod === 'POST' && event.body) {
      fetchOptions.body = event.body;
    }

    const res = await fetch(url, fetchOptions);
    const text = await res.text();
    return {
      statusCode: res.status,
      headers: { 'Content-Type': 'application/json' },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
