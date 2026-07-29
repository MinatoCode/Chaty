export function getRuntimeApiBaseUrl() {
  if (window.APP_API_BASE_URL) {
    return window.APP_API_BASE_URL;
  }

  const hostname = window.location.hostname;
  const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

  if (isLocalhost) {
    return 'http://localhost:3000/api';
  }

  return 'https://chaty-42ki.onrender.com/api';
}
