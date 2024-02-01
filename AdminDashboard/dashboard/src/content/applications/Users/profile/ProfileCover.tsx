import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  USER_ID
} from 'src/config/api';
import axios from 'axios';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
  `
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const ProfileCover = ({ user }) => {
  const [data, setData] = useState('')
  const [adminRecord, setAdminRecord] = useState('')

  useEffect(() => {
    const storedUsername = localStorage.getItem('adminId');
    console.log(storedUsername, "hello localhost")
   setData(storedUsername)
  }, []);

  console.log(data, "hello data from profile ")

  
  const base64Image2 = `data:image/png;base64,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`;


  useEffect(() => {

   

    const GetAdminIdList = async () => {
      
      await axios
        .get(USER_ID)
        .then((res) => {
          setAdminRecord(res.data.username);
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res.response.data);
        });
    };
    GetAdminIdList();
  }, []);


  return (
    <>
      <CardCover>
        <CardMedia image={user.coverImg} />
        {/* Rest of your code */}
      </CardCover>
      <AvatarWrapper>
        {/* <img src={base64Image} /> */}
        <Avatar src={base64Image2} alt="Base64 Image" />
        {/* Rest of your code */}
      </AvatarWrapper>
      {/* <img src={base64Image2} alt="Base64 Image" /> */}
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {adminRecord}
        </Typography>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
