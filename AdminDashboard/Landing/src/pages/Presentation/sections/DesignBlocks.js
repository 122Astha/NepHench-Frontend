/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import { Typography } from "@mui/material";

// Presentation page components
import ExampleCard from "pages/Presentation/components/ExampleCard";
import { api } from "../../../utils";
// Data
// import data from "pages/Presentation/sections/data/designBlocksData";

function DesignBlocks() {
  const [data, setData] = useState([]);
  // Filter the data to include only plumbers
  const plumberData = data.filter((item) => item.role === "Plumber");
  const electricianData = data.filter((item) => item.role === "Electrician");
  const CleanerData = data.filter((item) => item.role === "Cleaner");
  console.log(CleanerData, "cleanser Data after role ")

  // Slice the array to display only the first three plumbers
  const displayedPlumbers = plumberData.slice(0, 3);
  const displayedElectricians = electricianData.slice(0, 3);
  const displayedCleaners = CleanerData.slice(0, 3);

  const getServices = async () => {
    try {
      const res = await api.getDataFromApi("/services");
      setData(res);
      console.log(res, "response from services");
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(data, "data in response");
  useEffect(() => {
    getServices();
  }, []);

  return (
    <MKBox component="section" my={6} py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={6}
          flexDirection="column"
          alignItems="center"
          sx={{ textAlign: "center", my: 6, mx: "auto", px: 0.75 }}
        >
          <MKTypography variant="h2" fontWeight="bold">
            Huge collection of services
          </MKTypography>
          <MKTypography variant="body1" color="text">
            We have created multiple options for you to solve your selected problems.
          </MKTypography>
        </Grid>
      </Container>
      <Container sx={{ mt: 6 }}>
        {" "}
   
        {/* For Electrician Grid */}
        <Grid container spacing={3}>
          {displayedElectricians.map((Electrician) => (
            <Grid container item xs={12} lg={4} key={Electrician.id}>
              <MKBox mb={1}>
                <ExampleCard image={Electrician.image} />
             <Grid mt={5} >
             <Typography variant="h6" fontWeight="bold" mb={1}>
                  {Electrician.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  {Electrician.role}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {Electrician.description}
                </Typography>
             </Grid>
              </MKBox>
            </Grid>
          ))}
        </Grid>
        {/* For Cleaner Grid */}
        <Grid container spacing={3} mt={10}>
          {displayedCleaners.map((Cleaner) => (
            <Grid container item xs={12} lg={4} key={Cleaner.id}>
              <MKBox mb={1}>
                <ExampleCard image={Cleaner.image} />
          <Grid mt={5}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
                  {Cleaner.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  {Cleaner.role}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {Cleaner.description}
                </Typography>
          </Grid>
              </MKBox>
            </Grid>
          ))}
        </Grid>

        {/* For Plumber Grid  */}
        <Grid container spacing={3}>
          {displayedPlumbers.map((Plumber) => (
            <Grid container item xs={12} lg={4} key={Plumber.id}>
              <MKBox mb={1}>
                <ExampleCard image={Plumber.image} />
            <Grid mt={5}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
                  {Plumber.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" mb={1}>
                  {Plumber.role}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {Plumber.description}
                </Typography>
            </Grid>
              </MKBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default DesignBlocks;
