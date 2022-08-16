import React, { Dispatch, useContext, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { IMeeting, IToDoItem, IMeetingAttendee } from "../../types/meetings";
import { AppContext } from "../../contexts/AppContext";
import { updateMeeting } from "../../api/meeting";
import { useParams } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export interface ICreateToDoForm {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  meeting: IMeeting;
  handleGetMeeting: any;
  handleClose: any;
}

const CreateToDoForm: React.FC<ICreateToDoForm> = ({
  setOpen,
  meeting,
  handleGetMeeting,
  handleClose,
}) => {
  const { id } = useParams();
  const { email } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [assigneeId, setAssigneeId] = useState("");

  const handleCreate = async (e: any) => {
    e.preventDefault();
    console.log(title);

    const toDoList: IToDoItem[] = [];
    toDoList.push({
      title: title,
      dueDate: dueDate || new Date(),
      assigneeId: assigneeId,
    });
    console.log(toDoList);

    const meetingUpdate = {
      toDoItem: toDoList,
    };
    console.log({ meetingUpdate });
    await updateMeeting(meetingUpdate, Number(id));
    handleGetMeeting();
    handleClose();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setTitle(event.target.value);
  };

  const handleAssigneeChange = (event: SelectChangeEvent) => {
    setAssigneeId(event.target.value as string);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justify: "center",
      }}
    >
      <Card sx={{ display: "flex", flexGrow: 1, p: 4 }}>
        <CardContent sx={{ marginRight: 3 }}>
          <Grid
            container
            direction="column"
            sx={{
              display: "flex",
              flexGrow: 1,
              // marginLeft: 1,
              marginTop: 2,
            }}
          >
            <Grid
              container
              direction="row"
              sx={{ m: 2, display: "flex", flexGrow: 1 }}
            >
              <Grid item sx={{ m: "auto" }}>
                <GroupsTwoToneIcon
                  sx={{
                    fontSize: 40,
                    color: "#0CD68A",
                    m: "auto",
                  }}
                ></GroupsTwoToneIcon>
              </Grid>

              <Grid item>
                <Typography
                  variant="body1"
                  sx={{ fontSize: 40, mx: 2, my: "auto" }}
                >
                  Create To Do
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              sx={{
                m: 2,
              }}
            >
              <TextField
                id="title"
                fullWidth
                label="title"
                variant="filled"
                value={title}
                onChange={handleTitleChange}
              />
            </Grid>
            <Grid
              item
              sx={{
                m: 2,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Date Of Birth"
                  inputFormat="MM/dd/yyyy"
                  value={dueDate}
                  onChange={(value: Date | null) => setDueDate(value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid
              item
              sx={{
                m: 2,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Assignee</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={assigneeId}
                  label="Assignee"
                  onChange={handleAssigneeChange}
                >
                  {meeting?.meetingAttendee &&
                    meeting.meetingAttendee &&
                    meeting.meetingAttendee.map(
                      (attendee: IMeetingAttendee) => {
                        return (
                          <MenuItem value={attendee.userId}>
                            {attendee?.user?.firstName}{" "}
                            {attendee?.user?.lastName}
                          </MenuItem>
                        );
                      }
                    )}
                </Select>
              </FormControl>
            </Grid>

            <Grid
              item
              container
              direction="row"
              sx={{
                display: "flex",
                alignItem: "center",
                justifyContent: "flex-end",
                marginTop: 5,
              }}
            >
              <Button
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  marginRight: 5,
                  borderRadius: 8,
                  backgroundColor: "#6001D3",
                  color: "#FFFFFF",
                  fontSize: 12,
                }}
                variant="contained"
                onClick={handleCreate}
              >
                Create
              </Button>
              <Button
                sx={{
                  minWidth: "100px",
                  minHeight: "50px",
                  maxHeight: "50px",
                  maxWidth: "100px",
                  borderRadius: 8,
                  backgroundColor: "#FCDC00",
                  color: "#000000",
                  fontSize: 12,
                }}
                variant="contained"
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateToDoForm;
