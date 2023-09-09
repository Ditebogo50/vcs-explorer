import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";

import Header from "../layout/Header";

const getUserProfile = async (username) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/user/${username}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserRepos = async (username) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/repos/${username}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const loader = async ({ params }) => {
  const { username } = params;
  const profile = await getUserProfile(username);
  const repos = await getUserRepos(username);
  const results = { profile, repos };
  return results;
};

const renderRepo = (repo, index) => (
  <li
    className="flex place-items-center border-b border-b-slate-100 py-2"
    key={index}
  >
    <Link to={`/repos/${repo.owner.login}/${repo.name}`}>
      {repo.full_name}
    </Link>
  </li>
);

const Summary = ({ profile, repos }) => {
  return (
    <div className="p-4">
      <div className="flex items-center">
        <img className="w-20 h-20 rounded-full m-4" src={profile.avatar_url} />
        <div className="flex-row">
          <h2 className="text-lg font-bold">{profile.name}</h2>
          <h3 className="text-sm font-thin text-gray-400">
            {profile.username}
          </h3>
          <div className="text-base">{profile.description}</div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-bold">Repos</h2>
        <ul>{repos.map(renderRepo)}</ul>
      </div>
    </div>
  );
};

const Profile = () => {
  const { profile, repos } = useLoaderData();

  return (
    <>
      <Header />
      <Summary profile={profile} repos={repos} />
    </>
  );
};

export default Profile;
