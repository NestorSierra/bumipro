import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../stores/store";
import { Button, Typography } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CancelIcon from "@mui/icons-material/Cancel";
import ProfileEdit from "./ProfileEdit";

export default observer(function ProfileAbout() {
  const { profileStore } = useStore();
  const { profile, setEditMode, editMode } = profileStore;

  function handleSetEditMode(value: boolean) {
    setEditMode(value);
  }

  return (
    <div style={{ display: "flex", alignItems: "start" }}>
      {editMode ? (
        <ProfileEdit />
      ) : (
        <div style={{ flex: "1" }}>
          <Typography component="h4" sx={{ fontWeight: "bold" }}>
            {profile?.displayName}
          </Typography>
          <Typography component="h5" style={{ marginTop: "10px" }}>
            {profile?.email}
          </Typography>
          {profile?.mobile && (
            <Typography component="h5" style={{ marginTop: "10px" }}>
              {profile?.mobile}
            </Typography>
          )}
          {profile?.about && (
            <div style={{ marginTop: "10px" }}>
              <small>{profile?.about}</small>
            </div>
          )}
        </div>
      )}

      {!editMode && (
        <Button
          variant="outlined"
          size="medium"
          endIcon={<ModeEditIcon />}
          onClick={() => handleSetEditMode(true)}
        >
          Edit
        </Button>
      )}
    </div>
  );
});
