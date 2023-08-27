import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { TabOption } from "./../../models/tabOption";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface TabMenuProps {
  tabOptions: TabOption[];
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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabMenu({ tabOptions }: TabMenuProps) {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabOptions &&
            tabOptions.map((tabOption) => (
              <Tab
                key={tabOption.title}
                label={tabOption.title}
                {...a11yProps(tabOption.index)}
              />
            ))}
        </Tabs>
      </Box>
      {tabOptions &&
        tabOptions.map((tabOption) => (
          <TabPanel key={tabOption.title} value={value} index={tabOption.index}>
            {tabOption.content}
          </TabPanel>
        ))}
    </Box>
  );
}
