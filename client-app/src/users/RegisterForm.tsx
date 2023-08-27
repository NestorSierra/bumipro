import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../app/common/form/MyTextInput";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Alert } from "@mui/material";
import { useState } from "react";
import { UserRegisterFormValues } from "../models/user";
import * as Yup from "yup";
import ValidationError from "../features/errors/ValidationError";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  const [user, setUser] = useState<UserRegisterFormValues>(
    new UserRegisterFormValues()
  );

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(5, "The password should have at least 8 digists"),
    username: Yup.string().required("Username is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Password must match"),
    firstName: Yup.string().required("First Name is required"),
    familyName: Yup.string().required("Family Name is required"),
    profesion: Yup.string().required("Profesion is required"),
    relationshipStatus: Yup.string().required(
      "Relationship Status is required"
    ),
    phone: Yup.string(),
    mobile: Yup.string(),
  }).test(
    "phoneOrMobile",
    "Please provide at least one phone number",
    function (value) {
      const { phone, mobile } = value;
      return !!phone || !!mobile;
    }
  );

  return (
    <Formik
      initialValues={user}
      validationSchema={validationSchema}
      onSubmit={(values, { setErrors }) =>
        userStore.register(values).catch((error) => setErrors({ error }))
      }
    >
      {({ handleSubmit, isValid, isSubmitting, dirty, errors }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <MyTextInput label="Email" name="email"></MyTextInput>
          <MyTextInput label="Username" name="username"></MyTextInput>
          <MyTextInput
            label="Password"
            name="password"
            type="password"
          ></MyTextInput>
          <MyTextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          ></MyTextInput>
          <MyTextInput label="First Name" name="firstName"></MyTextInput>
          <MyTextInput label="Last Name" name="familyName"></MyTextInput>
          <MyTextInput label="Profesion" name="profesion"></MyTextInput>
          <MyTextInput
            label="Relationship Status"
            name="relationshipStatus"
          ></MyTextInput>
          <MyTextInput label="Phone" name="phone"></MyTextInput>
          <MyTextInput label="Mobile" name="mobile"></MyTextInput>
          <ErrorMessage
            name="error"
            render={() => <ValidationError errors={errors.error} />}
          />
          <LoadingButton
            color="primary"
            type="submit"
            variant="contained"
            disabled={isSubmitting || !dirty || !isValid}
            loading={isSubmitting}
            startIcon={<SaveIcon />}
          >
            Save
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
});
