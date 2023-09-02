import { useLoaderData } from "react-router-dom";
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

export const loader = async ({ params }) => {
  const { username } = params;
  const profile = await getUserProfile(username);
  return { profile };
};

const Summary = ({ profile }) => (
  <div className="p-4">
    <div className="flex items-center">
      <img className="w-20 h-20 rounded-full m-4" src={profile.avatar_url} />
      <div className="flex-row">
        <h2 className="text-lg font-bold">{profile.name}</h2>
        <h3 className="text-sm font-thin text-gray-400">{profile.username}</h3>
      </div>
    </div>
    <div className="text-base">{profile.description}</div>
  </div>
);

const Profile = () => {
  const { profile } = useLoaderData();

  return (
    <>
      <Header />
      <Summary profile={profile} />
    </>
  );
};

export default Profile;
