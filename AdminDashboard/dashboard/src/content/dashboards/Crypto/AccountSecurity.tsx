import { useState } from 'react';
import {
  Card,
  CardHeader,
  ListItemText,
  List,
  ListItem,
  Divider,
  Switch,
  ListItemAvatar,
  Avatar,
  styled
} from '@mui/material';
import { Link } from 'react-router-dom';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import PhoneLockedTwoToneIcon from '@mui/icons-material/PhoneLockedTwoTone';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Text from 'src/components/Text';

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
`
);

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

const AvatarWrapperWarning = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.warning.lighter};
      color:  ${theme.colors.warning.main};
`
);

function AccountSecurity() {
  const [checked, setChecked] = useState(['phone_verification']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Card>
      <CardHeader title="Feature List" />
      <Divider />
      <List disablePadding>
      <Link to="/management/services" style={{ textDecoration: 'none' }}>
        <ListItem
          sx={{
            py: 2
          }}
        >
          <ListItemAvatar>
            <AvatarWrapperError>
              <HomeRepairServiceIcon />
            </AvatarWrapperError>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black">Services</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
        </ListItem>
        </Link>
        <Divider />
        <Link to="/management/serviceProvider" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemAvatar>
              <AvatarWrapperSuccess>
                <ManageAccountsIcon />
              </AvatarWrapperSuccess>
            </ListItemAvatar>
            <ListItemText
              primary={<Text color="black">Service Category</Text>}
              primaryTypographyProps={{
                variant: 'body1',
                fontWeight: 'bold',
                color: 'textPrimary',
                gutterBottom: true,
                noWrap: true
              }}
              secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
            />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/management/booking" style={{ textDecoration: 'none' }}>
        <ListItem
          sx={{
            py: 2
          }}
        >
          <ListItemAvatar>
            <AvatarWrapperWarning>
              <BookOnlineIcon />
            </AvatarWrapperWarning>
          </ListItemAvatar>
          <ListItemText
            primary={<Text color="black">Bookings</Text>}
            primaryTypographyProps={{
              variant: 'body1',
              fontWeight: 'bold',
              color: 'textPrimary',
              gutterBottom: true,
              noWrap: true
            }}
            secondaryTypographyProps={{ variant: 'body2', noWrap: true }}
          />
        </ListItem>
        </Link>
      </List>
    </Card>
  );
}

export default AccountSecurity;
