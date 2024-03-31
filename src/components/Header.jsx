import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = ({headerRef}) => {
  return (
    <AppBar position="static" ref={headerRef}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            {import.meta.env.VITE_APP_TITLE}
          </Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Header
