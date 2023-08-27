import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../app/common/form/MyTextInput";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Alert } from "@mui/material";

export default observer(function LoginForm() {
  const { userStore } = useStore();

  return (
    <Formik
      initialValues={{ email: "", password: "", error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .catch(() => setErrors({ error: "Invalid email or password" }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
          <MyTextInput label="Email" name="email"></MyTextInput>
          <MyTextInput
            label="Password"
            name="password"
            type="password"
          ></MyTextInput>
          <ErrorMessage
            name="error"
            render={() => (
              <Alert
                severity="error"
                variant="outlined"
                style={{ marginBottom: "20px" }}
              >
                {errors.error}
              </Alert>
            )}
          />
          <LoadingButton
            color="primary"
            type="submit"
            variant="contained"
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
