import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { pink } from '@mui/material/colors';

export interface IPostingCardProps {}

const labels: { [index: string]: string } = {
  0: '0',
  0.5: '10',
  1: '20',
  1.5: '30',
  2: '40',
  2.5: '50',
  3: '60',
  3.5: '70',
  4: '80',
  4.5: '90',
  5: '100',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating(props: IPostingCardProps) {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        width: 800,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box> 
      <p>Satisfaction rating for Mentor:    </p>
      </Box>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 1.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
}
