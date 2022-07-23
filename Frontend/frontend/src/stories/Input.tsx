import { TextField } from "@mui/material";
import * as React from "react";

export interface IInputProps {
  style: any;
}

export default function Input(props: IInputProps) {
  return (
    <TextField
        style={props.style}
      sx={{
        "& .MuiInputBase-root": { borderRadius: "30px", opacity: "1",backgroundColor:'white' },
        "& .MuiInputBase-root:before": { opacity: "0" },
        "& .MuiInputBase-root:after": { opacity: "0" },
        "& .MuiInputBase-input": { marginLeft:'30px' },
        "& .MuiFormLabel-root": { marginLeft:'30px' },
        width: 406,
        height: 60,
      }}
      id="filled-basic"
      label="Filled"
      variant="filled"
    />
  );
}
