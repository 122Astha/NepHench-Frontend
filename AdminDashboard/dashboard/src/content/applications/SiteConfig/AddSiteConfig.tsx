import { Helmet } from 'react-helmet-async';
import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button
} from '@mui/material';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import { customConfig, SITECONFIG_ROUTE } from '../../../config/api';

function AddSiteConfig() {
  const [imageURL, setImageURL] = useState('');

  const [siteconfigData, setSiteconfigeData] = useState<any>({
    siteKey: '',
    siteValue: '',
    image: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSiteconfigeData({ ...siteconfigData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
     // Check if siteconfigData.image is not an empty string
  if (siteconfigData.image.trim() !== '') {
    // Include the image property only if a value is provided
    siteconfigData.image = imageURL;
  }
    const serviceRequest = JSON.stringify(siteconfigData);
    const result = await axios
      .post(SITECONFIG_ROUTE, serviceRequest, customConfig)
      .then((res) => console.log(res))
      .catch((error) => {
        toast.error(`${error?.response?.data?.message}`);
      });
    console.log(result);
  };

  return (
    <>
      <Helmet>
        <title>NepHench</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Input Fields" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      value={siteconfigData.name}
                      id="outlined-password-input"
                      label="Site Key"
                      name="siteKey"
                      type="text"
                      onChange={handleChange}
                    />
                    <TextField
                      value={siteconfigData.price}
                      id="outlined-password-input"
                      label="Site Value"
                      type="text"
                      name="siteValue"
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                    <TextField
                       value={siteconfigData.image}
                      id="outlined-password-input"
                      label="Image"
                      type="text"
                      name='image'
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                  </div>
                </Box>
                <Button
                  sx={{ margin: 1 }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default AddSiteConfig;
