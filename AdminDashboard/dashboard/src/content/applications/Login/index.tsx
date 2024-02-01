import React, { useState } from 'react';
import axios from 'axios'
import {
  Box,
  Card,
  Typography,
  Container,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom'
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';
import {ADMIN_LOGIN,customConfig } from '../../../config/api'

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
  `
);

const ButtonLogin = styled(Button)(
  ({ theme }) => `
    margin-top: ${theme.spacing(2)};
  `
);

const ForgotPasswordLink = styled(Link)(
  ({ theme }) => `
    margin-top: ${theme.spacing(2)};
  `
);

function Login() {
    const usenavigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
const handleLogin = async () => {
    // Add your login logic here.
    // For example, you can validate the email and password and then show an error dialog if login fails.
    if (username !== null && password !== null) {
      const sendData = { username, password };
      try {
        // Redirect to the dashboard or another page upon successful login.
        const result = await axios.post(ADMIN_LOGIN, sendData, customConfig);
        const adminRecord = result.data.id
        console.log(adminRecord, "response");

        localStorage.setItem('adminId', adminRecord);
        usenavigate('/dashboards/crypto')
      } catch (error) {
        // Handle error here, such as displaying an error message to the user
        console.error("Login error:", error);
        setIsErrorDialogOpen(true);
      }
    } else {
      // Display an error dialog for invalid credentials
      setIsErrorDialogOpen(true);
    }
  };
  

  const handleCloseErrorDialog = () => {
    setIsErrorDialogOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="sm">
          <Card sx={{ textAlign: 'center', p: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
              Login
            </Typography>
            <FormControl variant="outlined" fullWidth>
              <OutlinedInputWrapper
                type="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{ mt: 2 }}>
              <OutlinedInputWrapper
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <LockTwoToneIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <ButtonLogin
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleLogin}
            >
              Login
            </ButtonLogin>
            <ForgotPasswordLink href="#">Forgot password?</ForgotPasswordLink>
          </Card>
        </Container>
      </MainContent>

      {/* Error Dialog */}
      <Dialog
        open={isErrorDialogOpen}
        onClose={handleCloseErrorDialog}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">Invalid Credentials</DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
            The email or password you entered is incorrect. Please try again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Login;
