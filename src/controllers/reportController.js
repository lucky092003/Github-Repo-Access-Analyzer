const githubService = require('../services/githubService');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getAccessReport(req, res) {
  try {
    const org = process.env.ORG_NAME;

    if (!org) {
      return res.status(400).json({ error: "ORG_NAME not set" });
    }

    const repos = await githubService.getAllRepos(org);
    console.log("Total repos:", repos.length);

    const userAccessMap = {};
    const chunkSize = 5;

    for (let i = 0; i < repos.length; i += chunkSize) {
      const chunk = repos.slice(i, i + chunkSize);

      await Promise.all(
        chunk.map(async (repo) => {
          try {
            const contributors =
              await githubService.getRepoContributors(org, repo.name);

            contributors.forEach((user) => {
              if (!userAccessMap[user.login]) {
                userAccessMap[user.login] = [];
              }

              userAccessMap[user.login].push({
                repository: repo.name,
                contributions: user.contributions
              });
            });

            await sleep(200);
          } catch (err) {
            console.log(`Repo ${repo.name}:`, err.message);
          }
        })
      );
    }

    res.json({
      organization: org,
      totalRepositories: repos.length,
      totalUsers: Object.keys(userAccessMap).length,
      accessReport: userAccessMap
    });

  } catch (error) {
    console.error("Error:", error.message);

    res.status(500).json({
      error: "Failed to generate report",
      details: error.message
    });
  }
}

module.exports = { getAccessReport };