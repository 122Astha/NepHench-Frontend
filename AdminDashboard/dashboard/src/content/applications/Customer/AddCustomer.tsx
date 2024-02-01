
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
import { SERVICE_ROUTE, SERVICE_PROVIDER_ROUTE, customConfig } from '../../../config/api'
import { useNavigate } from 'react-router-dom';


function AddCustomer() {

  const [data, setData] = useState([])
  const [serviceData, setServiceData] = useState<any>({
    "description": '',
    "image": '',
    "name": '',
    "price": 0,
    "role": ''
  })

  useEffect(()=>{

    const GetUserList = async ()=>{
       await axios.get(SERVICE_PROVIDER_ROUTE).then((res)=>{
        setData(res.data);
        console.log(res.data)


      })
      .catch((res)=>{

        console.log(res.response.data)
      })
    }
    GetUserList();



  },[])

  const handleChange = (event) => {
    const { name, value } = event.target
    setServiceData({ ...serviceData, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    const serviceRequest = JSON.stringify(serviceData)

    const result = await axios.post(SERVICE_ROUTE, serviceRequest, customConfig)
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
                      id="outlined-select-currency"
                      select
                      label="Select"
                      name='role'
                      value={serviceData.role}
                      onChange={handleChange}
                    >
                      {data.map((option) => (
                        <MenuItem key={option.id} value={option.roleName}>
                          {option.roleName}
                        </MenuItem>
                      ))}
                    </TextField>
                      <TextField
                      value={serviceData.name}
                      id="outlined-password-input"
                      label="Name"
                      name='name'
                      type="text"
                      onChange={handleChange}
                    />
                      <TextField
                      value={serviceData.description}
                      id="outlined-password-input"
                      label="Description"
                      type="text"
                      name='description'
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                       <TextField
                       value={serviceData.price}
                      id="outlined-password-input"
                      label="Price"
                      type="number"
                      name='price'
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                      <TextField
                       value={serviceData.image}
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

export default AddCustomer;
