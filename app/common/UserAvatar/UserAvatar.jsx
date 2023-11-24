import { Typography } from "@mui/material";
import React from "react";

const UserAvatar = ({ userName }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          borderRadius: "50%",
          backgroundColor: "#F5E1C1",
          color: "black",
          padding: "15px",
          marginRight: "10px",
          display: "flex",
          alignItems: "center",
          width: "50px",
          height: "50px",
          textAlign: "center",
          justifyContent: "center",
          fontSize: "20px",
        }}
      >
        <Typography variant="span">
          <b>
            {userName.split(" ")[0][0]}
            {userName.split(" ")[1][0]}
          </b>
        </Typography>
      </div>
      <Typography variant="span">
        <b>{userName}</b>
      </Typography>
    </div>
  );
};

export default UserAvatar;
