export let API_ORIGIN = process.env.REACT_APP_BACKEND_URL

if(location.origin.includes('localhost')) {
  API_ORIGIN = 'http://localhost:8000'
} else {
    API_ORIGIN = 'https://api.startie.oliverstrat.me'
}
