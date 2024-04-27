import { SvgIconComponent } from "@mui/icons-material";
import {
  FormControl,  
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useField } from "formik";
import React from "react";

interface Props {
  name: string;
  label?: string;
  icon?: SvgIconComponent;
  readonly?: boolean;
  options: MySelectValue[];
  None?: string;
}

export interface MySelectValue {
  label: string;
  value: string;
}

export default function MySelect<T>(props: Props) {
  const [field, meta] = useField(props.name);

  return (
    <FormControl fullWidth variant="outlined" style={{ marginBottom: "1.5em" }}>
      {props.label && <InputLabel>{props.label}</InputLabel>}
      <Select
        {...field}
        value={field.value || ""} // Ensure a controlled component
        label={props.label}
        error={meta.touched && !!meta.error}
        inputProps={{
          readOnly: props.readonly,
        }}
      >
        {props.None && props.None.length > 0 && (
          <MenuItem value="">
            <em>{props.None}</em>
          </MenuItem>
        )}
        {props.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {meta.touched && meta.error && (
        <div
          style={{
            color: "#d32f2f",
            marginTop: "5px",
            fontWeight: "400",
            fontSize: "0.75rem",
            marginLeft: "14px",
          }}
        >
          {meta.error}
        </div>
      )}
    </FormControl>
  );
}
