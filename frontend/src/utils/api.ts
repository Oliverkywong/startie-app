export let API_ORIGIN = process.env.REACT_APP_BACKEND_URL

if (window.location.origin.includes('startie.oliverstrat.me')) {
  API_ORIGIN = 'https://api.startie.oliverstrat.me'
} else {
  API_ORIGIN = 'http://localhost:8000'
}
