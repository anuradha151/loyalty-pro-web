import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';


const links = [
  { titlePage: "Home", link: "/" },
  { titlePage: "Customer", link: "/customer" },
  { titlePage: "Settings", link: "/settings" },
];


function AppHeader() {

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={{
              color: 'white',
              textDecoration: 'none',
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' }
            }}
          >
            Nethum Medi Lab
          </Typography>
          <List sx={{ display: 'flex' }}>
            {links.map(({ titlePage, link }) => (
              <ListItem
                key={link}
                component={NavLink}
                to={link}
                sx={{ color: 'inherit' }}
              >
                {titlePage}
              </ListItem>
            ))}
          </List>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

AppHeader.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AppHeader;
