const axios = require('axios');

const githubClient = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github+json'
  }
});

githubClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response) {
      console.log("GitHub API Error:", {
        status: err.response.status,
        url: err.config.url
      });
    }
    return Promise.reject(err);
  }
);

module.exports = githubClient;