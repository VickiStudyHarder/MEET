import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea, Icon, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotesIcon from '@mui/icons-material/Notes';
import BallotIcon from '@mui/icons-material/Ballot';
import { pink, blue, purple } from '@mui/material/colors';
import GroupsIcon from '@mui/icons-material/Groups';
import IconButton from "@mui/material/IconButton";
import { useNavigate} from 'react-router-dom'

export interface IEmptyMeetingBox {
  id?: number;
  type: string
}

export default function EmptyMeetingBox(props: IEmptyMeetingBox) {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(`/${props.type}/${props.id}`)}>
    <Box sx={{ width: 260, height: 210 }}>
      <Card sx={{ width: 260, height: 210, borderRadius: 5 }}>
        <CardActionArea sx={{ display:'flex', flexGrow: 1, m:'auto', justify: 'center', justifyContent: 'center', align: 'center'}}>
          <CardContent sx={{ display:'flex', flexGrow: 1, m:'auto', justify: 'center', justifyContent: 'center', align: 'center'}}>
            <AddCircleOutlineIcon style={{fontSize: '160px', color: '#c2c2d6'}} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
    </Button>
  );
}
