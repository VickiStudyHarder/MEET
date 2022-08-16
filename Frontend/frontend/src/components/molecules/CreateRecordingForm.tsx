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
import {
  IMeeting,
  IToDoItem,
  IMeetingAttendee,
  IRecording,
} from "../../types/meetings";
import { AppContext } from "../../contexts/AppContext";
import { updateMeeting } from "../../api/meeting";
import { useParams } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import PageTitle from "../../stories/PageTiltle";
import CustomInput from "../../stories/Input";

export interface IRecordingForm {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  meeting: IMeeting;
  handleGetMeeting: any;
  handleClose: any;
}

const CreateRecordingForm: React.FC<IRecordingForm> = ({
  setOpen,
  meeting,
  handleGetMeeting,
  handleClose,
}) => {
  const { id } = useParams();
  const { email } = useContext(AppContext);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e: any) => {
    e.preventDefault();

    const recordingList: IRecording[] = [];
    recordingList.push({
      url: url,
      description: description,
    });

    const meetingUpdate = {
      recordings: recordingList,
    };
    await updateMeeting(meetingUpdate, Number(id));
    handleGetMeeting();
    handleClose();
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setUrl(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value as string);
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
        <CardContent sx={{ marginRight: 1 }}>
          <Grid
            container
            direction="column"
            sx={{
              display: "flex",
              flexGrow: 1,
              marginTop: 2,
            }}
          >
            <Grid
              container
              direction="row"
              sx={{ m: 2, display: "flex", flexGrow: 1 }}
            >
              <Grid item sx={{ m: "auto" }}>
                <PageTitle icon="1" content={"Create Recording"} />
              </Grid>
              {/* <Grid item sx={{ m: 'auto' }}>
                <GroupsTwoToneIcon
                  sx={{
                    fontSize: 40,
                    color: '#0CD68A',
                    m: 'auto',
                  }}
                ></GroupsTwoToneIcon>
              </Grid>

              <Grid item>
                <Typography
                  variant='body1'
                  sx={{ fontSize: 40, mx: 2, my: 'auto' }}
                >
                  Create Recording Form
                </Typography>
              </Grid> */}
            </Grid>
            {/* <Grid
              item
              sx={{
                m: 2,
              }}
            >
              <TextField
                id='url'
                fullWidth
                label='url'
                variant='filled'
                value={url}
                onChange={handleUrlChange}
              />
            </Grid> */}
            <CustomInput
              margin="normal"
              fullWidth
              id="url"
              label="url"
              autoFocus
              value={url}
              onChange={handleUrlChange}
            />
            {/* <Grid
              item
              sx={{
                m: 2,
              }}
            >
              <TextField
                id='description'
                fullWidth
                label='description'
                variant='filled'
                value={description}
                onChange={handleDescriptionChange}
              />
            </Grid> */}
            <CustomInput
              margin="normal"
              fullWidth
              id="description"
              label="description"
              autoFocus
              value={description}
              onChange={handleDescriptionChange}
            />
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
                  minWidth: "150px",
                  minHeight: "50px",
                  maxHeight: "50px",
                  maxWidth: "100px",
                  marginRight: 15,
                  marginLeft: 0,
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
                  minWidth: "150px",
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

export default CreateRecordingForm;
