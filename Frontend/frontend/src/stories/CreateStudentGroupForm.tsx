import React, { Dispatch, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea } from "@mui/material";
import GroupsTwoToneIcon from "@mui/icons-material/GroupsTwoTone";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createGroup } from "../api/groupChat";
import CustomInput from "./Input";
import PageTitle from "./PageTiltle";

export interface ICreateStudentGroupForm {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  getAllGroups: any;
}

const CreateStudentGroupForm: React.FC<ICreateStudentGroupForm> = ({
  setOpen,
  getAllGroups,
}) => {
  const [name, setGroupName] = useState<string>("");
  const [description, setGroupDescription] = useState<string>("");

  const handleCreate = async (e: any) => {
    e.preventDefault();
    console.log(name);
    console.log(description);
    if (name.length > 0 && description.length > 0) {
      const group = {
        name,
        description,
      };
      await createGroup(group);
      setOpen(false);
      await getAllGroups();
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroupName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupDescription(event.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justify: "center",
        borderRadius: 20,
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
                <PageTitle icon="2" content={"Create Group"} />
              </Grid>

              {/* <Grid item>
                <Typography
                  variant='body1'
                  sx={{ fontSize: 40, mx: 2, my: 'auto' }}
                >
                  Create Group
                </Typography> */}
              {/* </Grid> */}
            </Grid>

            {/* <Grid item>
              <TextField
                id='New-Group-Name'
                fullWidth
                label='Group Name'
                variant='filled'
                sx={{
                  marginTop: 5,
                }}
                value={name}
                onChange={handleNameChange}
              />
            </Grid> */}
            <CustomInput
              margin="normal"
              fullWidth
              id="New-Group-Name"
              label="Group Name"
              // autoComplete='name'
              autoFocus
              value={name}
              onChange={handleNameChange}
            />
            {/* <Grid item>
              <TextField
                id='New-Group-Description'
                fullWidth
                label='Group Description'
                variant='filled'
                sx={{
                  marginTop: 6,
                }}
                value={description}
                onChange={handleDescriptionChange}
              />
            </Grid> */}
            <CustomInput
              margin="normal"
              fullWidth
              id="New-Group-Description"
              label="Group Description"
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
                onClick={() => setOpen(false)}
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

export default CreateStudentGroupForm;
