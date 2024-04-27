import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";
import { Profile } from "../../models/user";
import { observer } from "mobx-react-lite";

interface Props {
  profile: Profile;
}

export default observer(function ProfileHeader({ profile }: Props) {
  return (
    <Card>
      <CardContent>
        <Grid container style={{ height: "auto" }}>
          <Grid item xs={8}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item>
                <Avatar
                  alt="User Avatar"
                  src={profile.image || "/assets/user.png"}
                  sx={{ width: "100px", height: "100px" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h3">{profile.displayName}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={12}>
                <Chip
                  color="success"
                  avatar={<Avatar>10</Avatar>}
                  label="Properties"
                />
              </Grid>
              <Grid item xs={12}>
                <Chip
                  color="primary"
                  avatar={<Avatar>10</Avatar>}
                  label="Applications"
                />
              </Grid>
              {profile.mobile && (
                <Grid item xs={12}>
                  <Chip
                    size="small"
                    icon={<PhoneIcon />}
                    label={profile.mobile}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <Chip size="small" icon={<MailIcon />} label={profile.email} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});
