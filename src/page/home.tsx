//This is home page that comes after landing page sigup

import React from "react";
import CreateRoom from "../component/CreateRoom";

const Home: React.FC = () => {
  return (
    <div>

      <h1>Welcome to the Home Page</h1>
      <p>This is the home page that appears after signing up on the landing page.</p>
      <h1>Show all the previous chats of the user here</h1>
        <CreateRoom />
    </div>
  );
}

export default Home;