const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const port = 3001;

app.get("/api/search", async (req, res) => {
  try {
    const username = req.query.username;

    // Search in GitHub
    const gitHubUsersResponse = await axios.get(
      `https://api.github.com/search/users?q=${username}`
    );

    const gitHubUsers = gitHubUsersResponse.data.items.map((user) => (
      { 
        provider: 'github',
        id: user.id, 
        username: user.login 
      }
    ));

    const allUsers = [...gitHubUsers];
    res.json({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
