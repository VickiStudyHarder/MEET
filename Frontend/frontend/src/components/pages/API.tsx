import { Button } from "@mui/material";
import { useState } from "@storybook/addons";
import React, { useContext, useEffect } from "react";
import AppContext from "../../contexts/AppContext";

type Props = {};

function API({}: Props) {
  // const { userMeetings } = useContext(AppContext);
  const [userMeetings, setUserMeetings] = useState([]);

  useEffect(() => {
    console.log("/api", userMeetings);
  }, [userMeetings]);

  return (
    <div>{userMeetings?.map((item: any) => item?.meeting?.description)}</div>
  );
}

export default API;
