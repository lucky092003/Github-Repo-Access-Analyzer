const githubClient = require('../utils/axiosClient');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


async function safeRequest(fn, retries = 3) {
  try {
    return await fn();
  } catch (err) {
    if (err.response) {
      const remaining = err.response.headers['x-ratelimit-remaining'];
      const reset = err.response.headers['x-ratelimit-reset'];

      if (remaining === '0' && reset) {
        const waitTime = reset * 1000 - Date.now();
        console.log(`⏳ Rate limit hit. Waiting ${Math.ceil(waitTime / 1000)}s`);
        await sleep(waitTime);
        return safeRequest(fn, retries);
      }
    }

    if (retries > 0) {
      console.log("🔁 Retrying API...");
      await sleep(500);
      return safeRequest(fn, retries - 1);
    }

    throw err;
  }
}


async function getAllRepos(org) {
  let page = 1;
  let repos = [];

  while (true) {
    const res = await safeRequest(() =>
      githubClient.get(`/orgs/${org}/repos?per_page=100&page=${page}`)
    );

    if (res.data.length === 0) break;

    repos = repos.concat(res.data);
    page++;

    await sleep(200);
  }

  return repos;
}


async function getRepoContributors(org, repo) {
  let page = 1;
  let users = [];

  while (true) {
    const res = await safeRequest(() =>
      githubClient.get(`/repos/${org}/${repo}/contributors?per_page=100&page=${page}`)
    );

    if (res.data.length === 0) break;

    users = users.concat(res.data);
    page++;

    await sleep(200);
  }

  return users;
}

module.exports = {
  getAllRepos,
  getRepoContributors
};