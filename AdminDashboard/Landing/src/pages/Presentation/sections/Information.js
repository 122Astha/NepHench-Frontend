import { useState, useEffect } from "react";
import { api } from "../../../utils";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/slide1.jpeg";

function Information() {
  const [data, setData] = useState([]);

  const getSiteConfig = async () => {
    try {
      const res = await api.getDataFromApi("/siteconfig");
      setData(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getSiteConfig();
  }, []);
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={<>Some services we provide for our customer</>}
              />
              <RotatingCardBack
                image={bgFront}
                icon="touch_app"
                title={<>With experienced service provider</>}
                description="Experienced verified Professionalsto serve you at your doorstep"
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              {data.map(
                (item, index) =>
                  item.siteKey === "Plumbing Service" && (
                    <Grid item xs={12} md={6} key={index}>
                      <DefaultInfoCard title={item.siteKey} description={item.siteValue} />
                    </Grid>
                  )
              )}
              {data.map(
                (item, index) =>
                  item.siteKey === "Cleaning Services" && (
                    <Grid item xs={12} md={6} key={index}>
                      <DefaultInfoCard title={item.siteKey} description={item.siteValue} />
                    </Grid>
                  )
              )}
              {data.map(
                (item, index) =>
                  item.siteKey === "Electrician Services" && (
                    <Grid item xs={12} md={6} key={index}>
                      <DefaultInfoCard title={item.siteKey} description={item.siteValue} />
                    </Grid>
                  )
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
