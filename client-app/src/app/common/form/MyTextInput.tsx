import { SvgIconComponent } from "@mui/icons-material";
import { Icon, InputAdornment, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";

interface Props {
  name: string;
  label?: string;
  type?: string;
  icon?: SvgIconComponent;
}

export default function MyTextInput(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <TextField
      {...field}
      {...props}
      label={props.label}
      fullWidth
      variant="outlined"
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      style={{ marginBottom: "1.5em" }}
      InputProps={{
        endAdornment: props.icon && (
          <InputAdornment position="end">
            <Icon component={props.icon} />
          </InputAdornment>
        ),
      }}
    />
  );
}
