const axios = require("axios");

const searchUser = async (username) => {
// Search in GitHub
const gitHubUsersResponse = await axios.get(
    `https://api.github.com/search/users?q=${username}`
  );

  return gitHubUsersResponse.data.items.map((user) => (
    { 
      provider: 'github',
      id: user.id, 
      username: user.login,
      avatar_url: user.avatar_url,
    }
  ));
}

module.exports = {
  searchUser,
}