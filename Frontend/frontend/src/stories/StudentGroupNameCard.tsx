import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import AppContext from '../contexts/AppContext';

export interface IStudentGroupNameCard {
  myGroups?: any;
}

export const StudentGroupNameCard: React.FC<IStudentGroupNameCard> = ({
  myGroups,
}) => {
  const { firstName, lastName } = useContext(AppContext);
  return (
    <Box sx={{ width: 380, height: 666}}>
      <Avatar
        sx={{
          width: 260,
          height: 260,
          borderRadius: 5,
          marginTop: 0,
          mx: 'auto',
        }}
        // src={props.imageUrl}
      />
      <Card sx={{ width: 380, height: 610, borderRadius: 5, marginTop: -25 , display: 'flex', flexDirection: 'column'}}>
        <CardActionArea>
          <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography
              variant='body1'
              component='h2'
              sx={{ textAlign: 'center', fontSize: '1.5rem', marginTop: 30 }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography
              variant='body1'
              component='h2'
              sx={{
                textAlign: 'center',
                fontSize: '0.8rem',
                marginTop: 2,
                color: '#70798B',
              }}
            ></Typography>

            <Typography  variant="h3" textAlign='center' sx={{ m: 8 }}>
                Your Groups
            </Typography>
              {myGroups &&
                myGroups.map((group: any) => {
                  return <Typography sx={{width: '100%', m: 'auto', textAlign: 'center' }}>{group.name}</Typography>;
                })}
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default StudentGroupNameCard;
