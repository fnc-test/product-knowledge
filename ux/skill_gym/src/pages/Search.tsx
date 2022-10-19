import { CustomSearch } from '@catenax-ng/skill-modules';
import { Typography } from 'cx-portal-shared-components';
import { Grid } from '@mui/material';
import { useState } from 'react';
import { BindingSet } from '@knowledge-agents-ux/skill_framework/dist/src';

export default function Search() {
  const [searchResult, setSearchResult] = useState<BindingSet>();

  return (
    <>
      <Typography
        sx={{
          mt: 3,
          mb: 3,
          fontFamily: 'LibreFranklin-Light',
          textAlign: 'center',
        }}
        variant="h4"
        className="section-title"
      >
        Execute Skills
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <CustomSearch onSearchResult={setSearchResult} />
        </Grid>
        <Grid item xs={12}>
          {searchResult && console.log(searchResult)}
        </Grid>
      </Grid>
    </>
  );
}
