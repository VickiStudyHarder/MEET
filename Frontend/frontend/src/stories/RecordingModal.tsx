import { Avatar, Button, Card, Fab, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


interface ListProps {
  createdBy: string;
  meetingName: string;
  pic: string;
  description: string;
  // delete/manage/detail
  type: string;
  onClick?: () => void;
}

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '95%',
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function RecordingModal({
  createdBy = "",
  meetingName = "",
  pic = "",
  type = 'delete',
  description = "",
  ...props
}: ListProps) {
  const [openDetail, setOpenDetail] = React.useState(false);
  const handleOpenDetail = () => setOpenDetail(true);
  const handleCloseDetail = () => setOpenDetail(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelet = () => setOpenDelete(false);

  const [openManage, setOpenManage] = React.useState(false);
  const handleOpenManage = () => setOpenManage(true);
  const handleCloseMange = () => setOpenManage(false);
  return (
    <>
      {
        type === 'detail' && (
          <div>
            <Button onClick={handleOpenDetail} variant="contained" style={{ backgroundColor: "#FD346E", borderRadius: 20, width: 155, height: 40, marginTop: 50 }}>
              Detail
            </Button>
            <Modal
              open={openDetail}
              onClose={handleCloseDetail}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="subtitle1" component="div" marginTop={2} >
                      Detail
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Avatar sx={{ width: 150, height: 150, margin: 6, marginLeft: 3 }} variant='circular' src={pic} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '70%' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography component="div" variant="h5" marginTop={8}>
                            {meetingName}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" component="div" marginTop={2} marginBottom={5}>
                            {description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: "center", marginRight: 3 }}>
                      <Button onClick={handleCloseDetail} variant="contained" style={{ backgroundColor: "#FCDC00", borderRadius: 20, width: 155, height: 40 }}>
                        Close
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="subtitle2" component="div" marginTop={2} marginBottom={2}>
                      Created by:&nbsp;
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div" marginTop={2} marginBottom={2}>
                      {createdBy}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Modal>
          </div>

        )}

      {
        type === 'delete' && (
          <div>
            <Fab onClick={handleOpenDelete} color="secondary" aria-label="delete recording" size="large">
              <DeleteOutlineIcon style={{ fontSize: 40, margin: 10 }} />
            </Fab>
            <Modal
              open={openDelete}
              onClose={handleCloseDelet}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="subtitle1" component="div" marginTop={2} >
                      Remove this recording from your list?
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Avatar sx={{ width: 150, height: 150, margin: 6, marginLeft: 3 }} variant='circular' src={pic} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', maxWidth: '70%' }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography component="div" variant="h5" marginTop={8}>
                            {meetingName}
                          </Typography>
                          <Typography variant="subtitle2" color="text.secondary" component="div" marginTop={2} marginBottom={5}>
                            {description}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: "center", marginRight: 3 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button variant="contained" style={{ backgroundColor: "#6001D3", borderRadius: 20, width: 165, height: 40, marginBottom: 15 }}>
                          Confirm
                        </Button>
                        <Button onClick={handleCloseDelet} variant="contained" style={{ backgroundColor: "#FCDC00", borderRadius: 20, width: 155, height: 40, marginLeft: 10 }}>
                          Cancel
                        </Button>
                      </Box>

                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="subtitle2" component="div" marginTop={2} marginBottom={2}>
                      Created by:&nbsp;
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" component="div" marginTop={2} marginBottom={2}>
                      {createdBy}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Modal>
          </div>
        )}
      {
        type === 'manage' && (
          <div>
            <Fab onClick={handleOpenManage} color="secondary" aria-label="manage recording" size="large">
              <KeyboardArrowRightIcon style={{ fontSize: 40, margin: 10 }} />
            </Fab>
            <Modal
              open={openManage}
              onClose={handleCloseMange}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                      <Avatar sx={{ width: 150, height: 150, margin: 6, marginLeft: 3 }} variant='circular' src={pic} />
                      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <TextField fullWidth id="meeting-name" label="Meeting name" variant="standard" sx={{ marginTop: 5, marginBottom: 2 }} />
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
                    <Box sx={{ display: 'flex', alignItems: "center", margin: 5 }}>
                      <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <CloudUploadIcon style={{ fontSize: 60 }} />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: "center", marginRight: 3 }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button variant="contained" style={{ backgroundColor: "#6001D3", borderRadius: 20, width: 165, height: 40, marginBottom: 15 }}>
                          Confirm
                        </Button>
                        <Button onClick={handleCloseMange} variant="contained" style={{ backgroundColor: "#FCDC00", borderRadius: 20, width: 155, height: 40, marginLeft: 10 }}>
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
};