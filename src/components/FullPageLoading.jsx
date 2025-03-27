import React from 'react';
import { CircularProgress, Backdrop, Typography } from '@mui/material';

const FullPageLoading = ({ message = 'Loading...', isOpen = true }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
      }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Backdrop>
  );
};

export default FullPageLoading;
