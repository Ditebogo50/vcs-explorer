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

app.get("/api/user/:username", async (req, res) => {
  try {
    const githubUser = await github.getUser(req.params.username);
    res.json(githubUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/api/repos/:username", async (req, res) => {
  try {
    const githubRepos = await github.getRepos(req.params.username);
    res.json(githubRepos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/api/repos/:username/:reponame", async (req, res) => {
  try {
    const githubRepo = await github.getRepo(req.params.username, req.params.reponame);
    res.json(githubRepo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.get("/api/repos/:username/:repo/commits", async (req, res) => {
  try {
    const githubCommits = await github.getCommits(req.params.username, req.params.repo);
    res.json(githubCommits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
