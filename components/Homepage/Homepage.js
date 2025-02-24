import React from 'react';
import Typography from '@mui/material/Typography';

const Homepage = () => {
  return (
    <div className="container">
      <Typography mb={2} variant="h4">
        Welcome!
      </Typography>
      <Typography variant="h6">This is your shell app.</Typography>
    </div>
  );
};

export default Homepage;
