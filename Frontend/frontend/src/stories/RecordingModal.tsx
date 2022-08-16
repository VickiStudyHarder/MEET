import {
  Avatar,
  Button,
  Card,
  Fab,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const ariaLabel = { "aria-label": "description" };

interface ListProps {
  meetingName?: string;
  pic?: string;
  description?: string;
  // delete/manage/detail
  type: string;
  doSomething?: (params: any) => any;
  onClick?: () => void;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function RecordingModal({
  meetingName = "",
  pic = "",
  type = "delete",
  description = "",
  doSomething,
  ...props
}: ListProps) {
  const [openDetail, setOpenDetail] = React.useState(false);
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelet = () => setOpenDelete(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  return (
    <>
      {type === "detail" && (
        <div>
          <Button
            onClick={handleOpenDetail}
            variant="contained"
            style={{
              backgroundColor: "#FD346E",
              borderRadius: 20,
              width: 155,
              height: 40,
              marginTop: 50,
            }}
          >
            Detail
          </Button>
          <Modal
            open={openDetail}
            onClose={handleCloseDetail}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="subtitle1" component="div" marginTop={2}>
                    Detail
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        margin: 6,
                        marginLeft: 10,
                      }}
                      variant="circular"
                      src={pic}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        maxWidth: "70%",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography component="div" variant="h5" marginTop={8}>
                          {meetingName}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                          marginTop={2}
                          marginBottom={5}
                        >
                          {description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 3,
                    }}
                  >
                    <Button
                      onClick={handleCloseDetail}
                      variant="contained"
                      style={{
                        color: "#000000",
                        backgroundColor: "#FCDC00",
                        borderRadius: 20,
                        width: 155,
                        height: 40,
                      }}
                    >
                      Close
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Modal>
        </div>
      )}

      {type === "delete" && (
        <div>
          <Fab
            onClick={handleOpenDelete}
            style={{ backgroundColor: "#6001D3" }}
            aria-label="delete recording"
            size="medium"
          >
            <DeleteOutlineIcon
              style={{ fontSize: 35, margin: 10, color: "#ffffff" }}
            />
          </Fab>
          <Modal
            open={openDelete}
            onClose={handleCloseDelet}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    marginTop={4}
                    marginBottom={-5}
                  >
                    Remove this recording?
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        margin: 6,
                        marginLeft: 12,
                      }}
                      variant="circular"
                      src={pic}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        maxWidth: "70%",
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography component="div" variant="h5" marginTop={8}>
                          {meetingName}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          component="div"
                          marginTop={2}
                          marginBottom={5}
                        >
                          {description}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        onClick={doSomething}
                        variant="contained"
                        style={{
                          backgroundColor: "#6001D3",
                          borderRadius: 20,
                          width: 165,
                          height: 40,
                          marginBottom: 15,
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={handleCloseDelet}
                        variant="contained"
                        style={{
                          color: "#000000",
                          backgroundColor: "#FCDC00",
                          borderRadius: 20,
                          width: 155,
                          height: 40,
                          marginLeft: 10,
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Modal>
        </div>
      )}
      {type === "edit" && (
        <div>
          <Fab
            onClick={handleOpenEdit}
            color="secondary"
            style={{ backgroundColor: "#6001D3" }}
            aria-label="manage recording"
            size="medium"
          >
            <EditIcon style={{ fontSize: 30, margin: 10 }} />
          </Fab>
          <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        margin: 6,
                        marginLeft: 12,
                      }}
                      variant="circular"
                      src={pic}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          component="div"
                          variant="h5"
                          marginTop={6}
                          marginBottom={2}
                        >
                          {meetingName}
                        </Typography>
                        <TextField
                          fullWidth
                          id="description"
                          label="Description"
                          multiline
                          rows={3}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", margin: 5 }}
                  >
                    <Input
                      placeholder="URL of recording"
                      inputProps={ariaLabel}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        onClick={doSomething}
                        variant="contained"
                        style={{
                          backgroundColor: "#6001D3",
                          borderRadius: 20,
                          width: 165,
                          height: 40,
                          marginBottom: 15,
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={handleCloseEdit}
                        variant="contained"
                        style={{
                          color: "#000000",
                          backgroundColor: "#FCDC00",
                          borderRadius: 20,
                          width: 155,
                          height: 40,
                          marginLeft: 10,
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Modal>
        </div>
      )}
      {type === "add" && (
        <div>
          <Button
            onClick={handleOpenAdd}
            variant="outlined"
            sx={{ borderColor: "#6001D3", color: "#6001D3" }}
            startIcon={<AddCircleOutlineIcon />}
          >
            New
          </Button>
          <Modal
            open={openAdd}
            onClose={handleCloseAdd}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        margin: 6,
                        marginLeft: 12,
                      }}
                      variant="circular"
                      src={pic}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        flex: 1,
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          component="div"
                          variant="h5"
                          marginTop={6}
                          marginBottom={2}
                        >
                          {meetingName}
                        </Typography>
                        <TextField
                          fullWidth
                          id="description"
                          label="Description"
                          multiline
                          rows={3}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", margin: 5 }}
                  >
                    <Input
                      placeholder="URL of recording"
                      inputProps={ariaLabel}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginRight: 12,
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        onClick={doSomething}
                        variant="contained"
                        style={{
                          backgroundColor: "#6001D3",
                          borderRadius: 20,
                          width: 165,
                          height: 40,
                          marginBottom: 15,
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={handleCloseAdd}
                        variant="contained"
                        style={{
                          color: "#000000",
                          backgroundColor: "#FCDC00",
                          borderRadius: 20,
                          width: 155,
                          height: 40,
                          marginLeft: 10,
                        }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}
