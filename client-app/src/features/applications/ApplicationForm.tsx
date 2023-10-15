import { observer } from "mobx-react-lite";
import React from "react";
import { useStore } from "../../stores/store";
import { Typography } from "@mui/material";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import { useParams } from "react-router-dom";
import { Application } from "../../models/application";

export default observer(function ApplicationForm() {
  const { applicationStore } = useStore();
  const { createApplication, updateApplication } = applicationStore;

  const { id } = useParams<{ id: string }>();

  const validationSchema = Yup.object({});

  function handleFormSubmit(application: Application) {
    if (!application.referenceNumber) {
      application.referenceNumber = uuid();
      application.creationDate = new Date();
      
    }
  }

  return (
    <div>
      <Typography variant="h4" fontWeight="bold" marginBottom={3}>
        {id ? "Edit Application" : "Create Application"}
      </Typography>
    </div>
  );
});
