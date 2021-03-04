import React from "react";
import ProfileCard from "../componenets/ProfileCard";

const UserPage = (props) => {
  return (
    <div className="container">
      <ProfileCard username={props.username} />
    </div>
  );
};
export default UserPage;
