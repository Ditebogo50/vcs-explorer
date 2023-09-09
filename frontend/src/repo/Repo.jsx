// Import necessary dependencies
import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";

import Header from "../layout/Header";

// Function to get user's repository
const getUserRepo = async (username, reponame) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/repos/${username}/${reponame}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Function to get repository's commits
const getCommits = async (username, reponame) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/repos/${username}/${reponame}/commits`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Loader function to fetch data for the component
export const loader = async ({ params }) => {
  const { username, reponame } = params;

  // Fetch user's repository
  const repo = await getUserRepo(username, reponame);

  // Fetch repository's commits
  const commits = await getCommits(username, reponame);

  const results = { repo, commits };
  return results;
};

// Function to render a commit
const renderCommit = (commit, index) => (
  <div key={index} className="p-2 flex">
    <img className="w-10 h-10 rounded-full" src={commit.committer.avatar_url} />
    <div className="px-4">
      <a href={commit.html_url} className="text-sm text-gray-700">{commit.sha}</a>
      <div className="text-base">{commit.commit.message}</div>
    </div>
  </div>
);

// Component to render the repository summary
const RepoSummary = ({ repo, commits }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl">{repo.full_name}</h2>
      <h3 className="text-lg text-gray-400">Commits</h3>
      {commits.map(renderCommit)}
    </div>
  );
};

// Component for the repository page
const Repo = () => {
  const { repo, commits } = useLoaderData();
  console.log(repo);
  console.log(commits);

  return (
    <>
      <Header />
      <RepoSummary repo={repo} commits={commits} />
    </>
  );
};

export default Repo; // Export the Repo component as the default export
