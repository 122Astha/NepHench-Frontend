import {
  Box,
  Tooltip,
  Badge,
  TooltipProps,
  tooltipClasses,
  styled,
  useTheme,
  Avatar
} from '@mui/material';

function Logo() {
  const theme = useTheme();

  return (
            <Avatar src="/static/images/avatars/logo2.png" style={{width:"100px", height:"100px"}}/>

  );
}

export default Logo;
