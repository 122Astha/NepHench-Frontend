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
import { useState, useEffect } from "react";

// @mui material components

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import HorizontalTeamCard from "examples/Cards/TeamCards/HorizontalTeamCard";

import { api } from "../../../../utils";
function Team() {
  const [data, setData] = useState([]);

  const getServiceProvider = async () => {
    try {
      const res = await api.getDataFromApi("/users/serviceproviders");
      console.log(res,"img")
console.log(res.image,"img")
    setData(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getServiceProvider();
  }, []);
  return (
    <MKBox
      component="section"
      variant="gradient"
      bgColor="dark"
      position="relative"
      py={6}
      px={{ xs: 2, lg: 0 }}
      mx={-2}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} md={8} sx={{ mb: 6 }}>
            <MKTypography variant="h3" color="white">
              Some Of Our Trusted Service Providers
            </MKTypography>
          </Grid>
        </Grid>

        {/* render */}
        <Grid container spacing={3}>
          {data.slice(0, 4).map((member, index) => (
            <Grid item xs={12} lg={6} key={index}>
              <MKBox mb={1}>
              
                <HorizontalTeamCard
                  // image={member.image} 
                  name={member.username}
                  position={{ color: "info", label: member.serviceprovider.roleName }}
                  description={member.serviceprovider.description}
                />
              </MKBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Team;
