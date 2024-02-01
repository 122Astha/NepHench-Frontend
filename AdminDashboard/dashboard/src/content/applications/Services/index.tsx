import { useState, ChangeEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Tabs, Tab, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import { styled } from '@mui/material/styles';
import RecentOrdersTable from './RecentOrdersTable';
// import RecordTab from './RecordTab';
import AddService from './AddService';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings() {
  const [record, setRecord] = useState<string>('Record');

  const tabs = [
    { value: 'Record', label: 'Record' },
    { value: 'Add Record', label: 'Add Record' },
  ];

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setRecord(value);
  };

  return (
    <>
      <Helmet>
        <title>User</title>
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
            <TabsWrapper
              onChange={handleTabsChange}
              value={record}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {record === 'Record' && <RecentOrdersTable />}
            {record === 'Add Record' && <AddService />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ManagementUserSettings;
