import React, { useState } from 'react';
import Logo from "../../assets/images/logo.png";
import Profile from "../../assets/images/profile.png";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  CssBaseline,
  Tooltip,
  Typography,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Dashboard,
  People,
  Settings,
  Menu as MenuIcon,
  Notifications,
  Logout
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 280;

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const drawer = (
    <div>
      <Box sx={{ padding: '16px 0' }}>
        <img
          src={Logo}
          alt="Logo"
          style={{
            width: '197.55px',
            height: '69px',
            marginBottom: '8px',
            marginTop: '42px',
            padding: '8px 16px'
          }}
        />
        <Typography
          className="Welcome"
          variant="h4"
          sx={{ color: '#000000', marginTop: '85px', textAlign: 'left', padding: '8px 16px' }}
        >
          Welcome <br /> Back, Charles!
        </Typography>
        <Typography
          className="About"
          sx={{ color: '#000000', marginTop: '5px', textAlign: 'left', padding: '8px 16px' }}
        >
          Manage leads and track progress
        </Typography>
      </Box>
      <List>
        <Typography
          className="Navigation"
          variant="h6"
          sx={{ color: '#A3A3A3', fontSize: '17.49px', marginTop: '85px', padding: '8px 16px' }}
        >
          Navigation
        </Typography>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard style={{ color: '#656565' }} />
            </ListItemIcon>
            <ListItemText className='NavText' primary="Leads Dashboard" sx={{ color: '#656565' }} />
          </ListItem>
        </Link>
        <Link to="/users" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <People style={{ color: '#656565' }} />
            </ListItemIcon>
            <ListItemText className='NavText' primary="Blogs & Articles" sx={{ color: '#656565' }} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#ffffff',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none', background: '#F1F1F1', color: 'gray' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className="HeaderText"
            variant="h3"
            sx={{
              color: '#656565',
              flexGrow: 1,
              fontSize: { xs: '13px', sm: '15px', md: '2.5rem' },
            }}
          >
            Leads Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
           
            <Link to="/addlead" style={{ textDecoration: 'none', color: '#000' }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#0177FB',
                borderRadius: '27.66px',
                color: '#ffffff',
                padding: '8px 16px',
                width: { xs: 'auto', sm: '200px' },
                height: { xs: '45px', sm: '56px' },
                fontSize: { xs: '0.875rem', sm: '1.25rem' },
              }}
            >
              New Lead
            </Button>
                  </Link>
            <Box
              sx={{
                backgroundColor: '#F1F1F1',
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Tooltip title="Notifications" arrow>
                <IconButton color="inherit">
                  <Notifications sx={{ color: '#686464' }} />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Profile Image with Dropdown */}
            <Box
              sx={{
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Tooltip title="Profile" arrow>
                <IconButton onClick={handleProfileClick}>
                  <img style={{ width: '77px', height: '77px' }} src={Profile} alt="Profile" />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
               
                <MenuItem onClick={handleClose}>
                  <Typography className="UserName" variant="body1" sx={{ color: '#656565', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    Charles Gray
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Typography className="UserEmail" variant="body2" sx={{ color: '#A3A3A3', fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    charlesgray@gmail.com
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/profile" style={{ textDecoration: 'none', color: '#000' }}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#ffffff',
              boxShadow: 'none',
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#ffffff',
              boxShadow: 'none',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` }, // Adjusted to take into account the sidebar width
          padding: { xs: 2, sm: 3, md: 5 },
          marginTop: '64px',
          overflowX: 'auto', // Allows for horizontal scrolling if content is too wide
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
