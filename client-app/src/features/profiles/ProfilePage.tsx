import { Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { useParams } from "react-router-dom";
import { useStore } from "../../stores/store";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile } = profileStore;

  useEffect(() => {
    if (username) loadProfile(username);
  }, [loadProfile, username]);

  if (loadingProfile) return <LoadingComponent content="Loadig profile..." />;

  return (
    <>
      {profile && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProfileHeader profile={profile}></ProfileHeader>
          </Grid>
          <Grid item xs={12}>
            <ProfileContent profile={profile}></ProfileContent>
          </Grid>
        </Grid>
      )}
    </>
  );
});
