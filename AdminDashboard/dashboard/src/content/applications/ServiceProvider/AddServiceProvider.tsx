
import { Helmet } from 'react-helmet-async';
import React, {ChangeEvent, useState,useRef, useEffect } from 'react';
import { PhotoCamera } from '@mui/icons-material'

import axios from 'axios'
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
  IconButton
} from '@mui/material';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { customConfig, SERVICE_PROVIDER_POST_ROUTE } from '../../../config/api'
import { useNavigate } from 'react-router-dom';


function AddService() {
  const [serviceProviderData, setServiceProviderData] = useState<any>({
    "description": '',
    "roleName": '',
    "image": '',
  })


  const handleChange = (event) => {
    const { name, value } = event.target
    setServiceProviderData({ ...serviceProviderData, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    const serviceRequest = JSON.stringify(serviceProviderData)

    const result = await axios.post(SERVICE_PROVIDER_POST_ROUTE, serviceRequest, customConfig)
      .then((res) => console.log(res))
      .catch((error) => console.log(error))

    console.log(result)
  }

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
              <CardHeader title=" Add Service Provider" />
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
                      value={serviceProviderData.name}
                      id="outlined-password-input"
                      label="Role Name"
                      name='roleName'
                      type="text"
                      onChange={handleChange}
                    />
                      <TextField
                      value={serviceProviderData.description}
                      id="outlined-password-input"
                      label="Description"
                      type="text"
                      name='description'
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                      <TextField
                       value={serviceProviderData.image}
                      id="outlined-password-input"
                      label="Image"
                      type="text"
                      name='image'
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                  </div>
                </Box>
                <Button sx={{ margin: 1 }} variant="contained" color="primary" onClick={handleSubmit} >
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

export default AddService;
