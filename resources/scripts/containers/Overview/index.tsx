import * as React from 'react';
import type {} from '@mui/lab/themeAugmentation';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import backgroundImage from '@assets/images/temp-bg.jpg';


const StyledGrid = styled(Grid)(({ theme }) => ({
  background: 'transparent',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}));

export default function Overview() {
  const today = new Date();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StyledGrid container spacing={3}>
        <Grid item md={4} lg={3}>
          <Card>
          <CardMedia
              component="img"
              height="140"
              image={backgroundImage}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Welcome
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={5} lg={4}>
          <Card>
            <CalendarPicker date={today} onChange={() => {}} />
          </Card>
        </Grid>
      </StyledGrid>
          
    </LocalizationProvider>
  );
}
