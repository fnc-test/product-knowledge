import { PageHeader, SharedThemeProvider } from 'cx-portal-shared-components';
import AssetList from './AssetList';
import { Box, Grid } from '@mui/material';
import React from "react";
import "./styles.sass"

export const AssetView = () => {
  return (
    <SharedThemeProvider>
      <PageHeader background='LinearGradient3' title='Asset List' />
      <Box sx={{mb: 8}} maxWidth='2000px' p={8}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <AssetList />
          </Grid>
        </Grid>
      </Box>
    </SharedThemeProvider>
  );
};