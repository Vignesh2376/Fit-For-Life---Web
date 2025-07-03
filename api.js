const API_BASE = 'http://localhost:8000/api/v1/';
const AUTH_BASE = 'http://localhost:8000/api/auth/';

function getToken() {
  return localStorage.getItem('access');
}

async function apiRequest(endpoint, method = 'GET', data = null) {
  // Determine if this is an auth endpoint
  const isAuthEndpoint = endpoint.startsWith('accounts/');
  const baseUrl = isAuthEndpoint ? AUTH_BASE : API_BASE;
  
  const headers = {
    'Content-Type': 'application/json',
    ...(getToken() && { 'Authorization': `Bearer ${getToken()}` })
  };
  const options = { method, headers };
  if (data) options.body = JSON.stringify(data);
  
  // Remove 'accounts/' prefix for auth endpoints
  const finalEndpoint = isAuthEndpoint ? endpoint.replace('accounts/', '') : endpoint;
  const res = await fetch(baseUrl + finalEndpoint, options);
  if (!res.ok) throw await res.json();
  return res.json();
}

export default apiRequest; 