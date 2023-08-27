import { TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

interface Props {
  name: string;
  rows: number;
  label?: string;
}

export default function MyTextArea(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      {...field}
      {...props}
      label={props.label}
      variant="outlined"
      fullWidth
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      style={{ marginBottom: "1.5em" }}
      multiline
    />
  );
}
