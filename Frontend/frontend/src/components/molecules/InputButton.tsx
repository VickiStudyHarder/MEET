import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IInputButton {
  label: string;
  value: string;
}

const InputButton: React.FC<IInputButton> = ({ label, value = "" }) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      InputProps={{ endAdornment: <Button /> }}
    />
  );
};

export default InputButton;
