import { TextField } from "@mui/material";
import * as React from "react";

export interface IInputProps {
  sx: any;
  ref?: any;
  label?: string;
  onChange?:any;
  type?:any;
  id?:any;
  name?:any;
  value?:any
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
      ref={props.ref || null}
      id={props.id}
      label={props.label || ""}
      variant="filled"
      onChange={(e:any)=>{props.onChange(e)}}
      type={props.type}
      value={props.value}
      name={props.name}
    />
  );
}
