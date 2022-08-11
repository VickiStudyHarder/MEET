import { TextField } from "@mui/material";
import * as React from "react";

export interface IInputProps {
  sx?: any;
  margin?: any;
  required?:boolean;
  fullWidth?:any;
  id?:any;
  label?:any;
  name?:any;
  autoComplete?:any;
  autoFocus?:any;
  value?:any;
  onChange?:any;
  type?:any;
}

export default function CustomInput(props: IInputProps) {
  return (
    <TextField
      sx={{
        ...props.sx,
        "& .MuiInputBase-root": {
          borderRadius: "30px",
          opacity: "1",
          backgroundColor: "white",
        },
        "& .MuiInputBase-root:before": { opacity: "0" },
        "& .MuiInputBase-root:after": { opacity: "0" },
        "& .MuiInputBase-input": { marginLeft: "30px" },
        "& .MuiFormLabel-root": { marginLeft: "30px" },
        width: 406,
        height: 60,
      }}
      margin={props.margin}
      required={props.required}
      fullWidth={props.fullWidth}
      id={props.id}
      label={props.label}
      name={props.name}
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
    />
  );
}
