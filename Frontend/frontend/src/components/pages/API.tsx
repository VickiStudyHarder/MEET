import { Button } from "@mui/material";
import React, { useContext, useEffect } from "react";
import AppContext from "../../contexts/AppContext";

type Props = {};

function API({}: Props) {
  const { userMeetings } = useContext(AppContext);

  return (
    <div>
      <Button
      ></Button>
    </div>
  );
}

export default API;
