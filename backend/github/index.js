// Import the axios module
const axios = require("axios");

// Function to search for GitHub users using the GitHub API
const searchUser = async (username) => {
  // Send a GET request to the GitHub API with the specified username
  const gitHubUsersResponse = await axios.get(
    `https://api.github.com/search/users?q=${username}`
  );

  // Get the data from the API response and map it to a new array of user objects
  return gitHubUsersResponse.data.items.map((user) => ({
    provider: "github",
    id: user.id,
    username: user.login,
    avatar_url: user.avatar_url,
  }));
};

// Function to get a specific GitHub user using the GitHub API
const getUser = async (username) => {
  // Send a GET request to the GitHub API with the specified username
  const response = await axios.get(`https://api.github.com/users/${username}`);

  // Get the data from the API response and create a user object
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

// Function to get the repositories of a specific GitHub user using the GitHub API
const getRepos = async (username) => {
  // Send a GET request to the GitHub API with the specified username
  const response = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  // Return the data from the API response
  return response.data;
};

// Function to get a specific repository of a GitHub user using the GitHub API
const getRepo = async (username, reponame) => {
  // Send a GET request to the GitHub API with the specified username and repository name
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${reponame}`
  );

  // Return the data from the API response
  return response.data;
};

// Function to get the commits of a specific repository of a GitHub user using the GitHub API
const getCommits = async (username, repo) => {
  // Send a GET request to the GitHub API with the specified username and repository name
  const response = await axios.get(
    `https://api.github.com/repos/${username}/${repo}/commits?per_page=5`
  );

  // Return the data from the API response
  return response.data;
};

// Export the functions to be used in other modules
module.exports = {
  searchUser,
  getUser,
  getRepos,
  getRepo,
  getCommits,
};
