const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const github = require("./github")

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

const port = 3001;

app.get("/api/search", async (req, res) => {
  try {
    const gitHubUsers = await github.searchUser(req.query.username);
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
