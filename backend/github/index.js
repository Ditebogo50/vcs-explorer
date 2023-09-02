const axios = require("axios");

const searchUser = async (username) => {
  // Search in GitHub
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
  // Get user from Github when we have the username
  const response = await axios.get(`https://api.github.com/users/${username}`);
  const user = response.data;
  return {
    provider: "github",
    id: user.id,
    name: user.name,
    username: user.login,
    avatar_url: user.avatar_url,
    description: user.bio,
  };
};

module.exports = {
  searchUser,
  getUser,
};
