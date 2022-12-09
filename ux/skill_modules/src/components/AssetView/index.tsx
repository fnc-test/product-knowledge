import AssetList from './AssetList';
import React from 'react';
import './styles.sass';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

export const AssetView = () => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography p={2} variant="h4">
          Asset List
        </Typography>
        <AssetList />
      </Grid>
    </Grid>
  );
};
