import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';


export default function CircularIndeterminate2() {

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Fade in={true}>
        <CircularProgress />
      </Fade>
    </Box>
  );
}
