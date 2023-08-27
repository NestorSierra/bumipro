import React from "react";

import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Profile } from "./../../models/user";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import { Button, ButtonGroup } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

export default observer(function ProfileEdit() {
  const { profileStore } = useStore();
  const { profile, setEditMode, updateProfile } = profileStore;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Address is required"),
    lastName: Yup.string().required("Address is required"),
    email: Yup.string()
      .required("Country is required")
      .email("Please enter a valid email"),
  });

  function handleFormSubmit(profile: Profile) {
    updateProfile(profile);
  }

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={profile!}
      onSubmit={(values) => handleFormSubmit(values)}
    >
      {({ handleSubmit, isValid, isSubmitting, dirty }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput label="First Name" name="firstName"></MyTextInput>
          <MyTextInput label="Family Name" name="lastName"></MyTextInput>
          <MyTextInput label="Email" name="email"></MyTextInput>
          <MyTextArea
            name="about"
            label="Tell us something about you"
            rows={3}
          />
          <ButtonGroup fullWidth>
            <LoadingButton
              type="submit"
              disabled={isSubmitting || !dirty || !isValid}
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
              loading={isSubmitting}
            >
              Save
            </LoadingButton>

            <Button
              color="error"
              variant="contained"
              onClick={() => setEditMode(false)}
              startIcon={<CancelIcon />}
            >
              Cancel
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
});
