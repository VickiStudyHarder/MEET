import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import { Avatar, Button, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

export interface IRatingCard {
  imageUrl?: string;
  userName?: string;
  courseName?: string;
  UserType?: string;
  Part_rate?: number;
  doSomething?: (params: any) => any;
}

export default function RatingCardMentor(props: IRatingCard) {
  const [value, setValue] = React.useState<number | null>(3);
  console.log(value);
  return (
    <Box sx={{ width: 662, height: 600 }}>
      <Avatar
        sx={{
          width: 188,
          height: 188,
          borderRadius: 94,
          mx: 'auto',
        }}
        variant='rounded'
        src={props.imageUrl}
      />

      <Card
        sx={{
          width: 662,
          height: 550,
          borderRadius: 5,
          marginTop: -12,
        }}
      >
        <Grid
          container
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            direction: 'column',
          }}
        >
          <Grid item>
            <CardContent sx={{ borderRadius: 5, marginTop: 15 }}>
              <Typography
                component='legend'
                variant='h3'
                sx={{
                  marginTop: 1,
                  mx: 'auto',
                }}
              >
                {props.userName}
              </Typography>

              <Typography
                variant='h5'
                component='legend'
                sx={{
                  mx: 'auto',
                  marginTop: 5,
                  fontSize: '2rem',
                }}
              >
                Please give me a evaluation
                <SentimentSatisfiedAltIcon
                  style={{
                    fontSize: 35,
                    marginLeft: 5,
                    marginTop: 5,
                    color: '#6001D3',
                  }}
                />
              </Typography>

              <Box
                sx={{ marginTop: 5, justifyContent: 'center', display: 'flex' }}
              >
                <Typography
                  component='div'
                  variant='h5'
                  sx={{ color: '#ABAFC7' }}
                >
                  Select here:&nbsp;&nbsp;
                </Typography>
                <Rating
                  name='simple-controlled'
                  value={value}
                  size='large'
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Button
                  onClick={props.doSomething}
                  variant='contained'
                  style={{
                    backgroundColor: '#6001D3',
                    borderRadius: 20,
                    width: 155,
                    height: 40,
                    marginTop: 50,
                  }}
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
