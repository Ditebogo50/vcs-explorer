const axios = require("axios");

const searchUser = async (username) => {
  const gitHubUsersResponse = await axios.get(
    `https://api.github.com/search/users?q=${username}`
  );

  return gitHubUsersResponse.data.items.map((user) => ({
    provider: "github",
    id: user.id,
    username: user.login,
    avatar_url: user.avatar_url,
  }));
};

const getUser = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  const user = response.data;
  return {
    provider: "github",
    id: user.id,
    name: user.name,
    username: user.login,
    avatar_url: user.avatar_url,
    description: user.bio,
    repos_url: user.repos_url,
  };
};

const getRepos = async (username) => {
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );
  return response.data;
};

const getRepo = async (username, reponame) => {
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${reponame}`
  );
  return response.data;
}

const getCommits = async (username, repo) => {
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${repo}/commits?per_page=5  `
  );
  return response.data;
 
};

module.exports = {
  searchUser,
  getUser,
  getRepos,
  getRepo,
  getCommits,
};
