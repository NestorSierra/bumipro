import { Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { TabOption } from "./../../models/tabOption";
import TabMenu from "../../app/layout/TabMenu";
import ProfilePhotos from "./ProfilePhotos";
import { observer } from "mobx-react-lite";
import { Profile } from "../../models/user";
import ProfileAbout from "./ProfileAbout";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface Props {
  profile: Profile;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default observer(function ProfileContent({ profile }: Props) {
  const tabOptions: TabOption[] = [
    { title: "About", index: 0, content: <ProfileAbout /> },
    {
      title: "Photos",
      index: 1,
      content: <ProfilePhotos profile={profile} />,
    },
  ];

  return (
    <Card>
      <CardContent>
        <TabMenu tabOptions={tabOptions}></TabMenu>
      </CardContent>
    </Card>
  );
});
