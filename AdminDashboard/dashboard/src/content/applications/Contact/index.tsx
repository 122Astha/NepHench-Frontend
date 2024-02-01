import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';

import RecentOrdersTable from './RecentOrdersTable';

function ApplicationsContact() {
  return (
    <>
      <Helmet>
        <title>NepHench</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrdersTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ApplicationsContact;
