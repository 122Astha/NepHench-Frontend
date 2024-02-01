import { Helmet } from 'react-helmet-async';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
  Button
} from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useRef, useState, useEffect } from 'react';

import {
  USER_ID
} from 'src/config/api';
import axios from 'axios';
function Forms() {
const [admin, setAdmin] = useState('')
const [email, setEmail] = useState('')
const [address, setAddress] = useState('')
  
  useEffect(() => {

    const GetAdminIdList = async () => {
      
      await axios
        .get(USER_ID)
        .then((res) => {
          setAdmin(res.data.username);
          setEmail(res.data.email);
          setAddress(res.data.address);
        })
        .catch((res) => {
          console.log(res.response.data);
        });
      };
      GetAdminIdList();
      console.log(admin, "admin ")
  }, []);
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
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '35ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="outlined-password-input"
                      label="User name"
                      type="username"
                      value={admin}
                      autoComplete="current-password"
                    />
                     <TextField
                      id="outlined-password-input"
                      label="Email"
                      type="email"
                      value={email}
                      autoComplete="current-password"
                    />
                     <TextField
                      id="outlined-password-input"
                      label="Address"
                      type="address"
                      value={address}
                      autoComplete="current-password"
                    />
                  </div>
                  <Button sx={{ margin: 1 }} variant="contained" color="primary" >
                  Edit Profile
                </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Forms;
