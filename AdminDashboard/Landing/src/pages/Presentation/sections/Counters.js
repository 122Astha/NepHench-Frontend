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

// @mui material components
import { useState, useEffect } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import {api} from "../../../utils"

// Material Kit 2 React examples
import DefaultCounterCard from "examples/Cards/CounterCards/DefaultCounterCard";

function Counters() {
  const [services, setServices] = useState({})
  const [serviceProvider, setServiceProvider] = useState({})
  const [customer, setCustomer] = useState({})

  const getService = async () => {
    try {
      const res = await api.getDataFromApi("/serviceprovider");
      // setServices(res);
      const itemCount = res.length;
      setServices(itemCount);
      
    } catch (error) {
      console.log(error.message);
    }
  };
  const getServiceProvider = async () => {
    try {
      const res = await api.getDataFromApi("/users/serviceproviders");
      const itemCount = res.length;
      setServiceProvider(itemCount);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getCustomer = async () => {
    try {
      const res = await api.getDataFromApi("/users/customers");
      const itemCount = res.length;
      setCustomer(itemCount);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getService();
    getCustomer();
    getServiceProvider();
  }, []);
  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container item xs={12} lg={9} sx={{ mx: "auto" }}>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={services}
              title="Ours Services"
            />
          </Grid>
          <Grid item xs={12} md={4} >
            <DefaultCounterCard
              count={serviceProvider}
              title="Our Service Provider"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DefaultCounterCard
              count={customer}
              title="Our Customer"
            />
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Counters;
