import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useSelector } from 'react-redux';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Lock } from '@mui/icons-material';
import { userTypes } from "../utils.js";

const ProfileSidebar = (props) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [selectedContent, setSelectedContent] = useState("profile");

  const loggedUser = useSelector((state) => state.user);

  const handleItemClick = (content) => {
    props.onItemClick(content);
    setSelectedContent(content);
  };

  const setPrivileges = () => {
    switch (loggedUser.userType) {
      case userTypes.HR_MANAGER:
        return (
          <span>
<ListItem button onClick={() => handleItemClick("addEmployee")} sx={{ backgroundColor: selectedContent === "addEmployee" ? "rgba(0, 0, 0, 0.08)" : "" }}>
            <ListItemIcon>
              <PersonAddAlt1Icon />
            </ListItemIcon>
            {isMd && <ListItemText primary="Add Employee" />}
          </ListItem>

          <ListItem button onClick={() => handleItemClick("siteDetails")} sx={{ backgroundColor: selectedContent === "siteDetails" ? "rgba(0, 0, 0, 0.08)" : "" }}>
            <ListItemIcon>
            <VisibilityIcon />
            </ListItemIcon>
            {isMd && <ListItemText primary="siteDetails" />}
          </ListItem>

          <ListItem button onClick={() => handleItemClick("viewEmployee")} sx={{ backgroundColor: selectedContent === "viewEmployee" ? "rgba(0, 0, 0, 0.08)" : "" }}>
            <ListItemIcon>
            <VisibilityIcon />
            </ListItemIcon>
            {isMd && <ListItemText primary="View Employee" />}
          </ListItem>
          </span>
        )

      default:
        break;
    }
  }

  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.mainOpacity,
        minHeight: "calc(100vh - 64px)",
        padding: "20px",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Sidebar Content
      </Typography>
      <List>

        <ListItem button onClick={() => handleItemClick("profile")} sx={{ backgroundColor: selectedContent === "profile" ? "rgba(0, 0, 0, 0.08)" : "" }}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          {isMd && <ListItemText primary="Profile" />}
        </ListItem>

        {setPrivileges()}

        <ListItem button onClick={() => handleItemClick("changePassword")} sx={{ backgroundColor: selectedContent === "changePassword" ? "rgba(0, 0, 0, 0.08)" : "" }}>
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          {isMd && <ListItemText primary="Change Password" />}
        </ListItem>

      </List>
    </div>
  );
};

export default ProfileSidebar;
