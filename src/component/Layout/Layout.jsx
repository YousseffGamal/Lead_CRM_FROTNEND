// src/components/Layout.jsx
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
  Button // Import Button component
} from '@mui/material';
import {
  Dashboard,
  People,
  Settings,
  Menu,
  Notifications,
  Logout
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const drawerWidth = 280; // Increased width of the drawer

const Layout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box sx={{ textAlign: 'center', padding: '16px 0' }}>
        <img
          src={Logo}
          alt="Logo"
          style={{ width: '197.55px', height: '69px', marginBottom: "8px", marginTop: "42px" }}
        />
        <Typography variant="h4" sx={{ color: '#000000', marginTop: '85px', textAlign: "left", padding: "8px 16px" }}>
          Welcome <br /> Back, Charles!
        </Typography>
      </Box>
      <List>
        <Typography variant="h6" sx={{ color: '#A3A3A3', fontSize: '17.49px', marginTop: 2, padding: "8px 16px" }}>
          Navigation
        </Typography>
        <Link to="/dashboard" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <Dashboard style={{ color: '#656565' }} />
            </ListItemIcon>
            <ListItemText primary="Leads Dashboard" sx={{ color: '#656565' }} />
          </ListItem>
        </Link>
        <Link to="/users" style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemIcon>
              <People style={{ color: '#656565' }} />
            </ListItemIcon>
            <ListItemText primary="Users" sx={{ color: '#656565' }} />
          </ListItem>
        </Link>
        {/* Repeat for other links */}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 20px' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none', background: "#F1F1F1", color: "gray" } }}
          >
            <Menu />
          </IconButton>
          <Typography 
            variant="h3" 
            sx={{ 
              color: '#656565', 
              flexGrow: 1, 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } 
            }}
          >
            Leads Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#000000',
                borderRadius: '27.66px',
                color: '#ffffff',
                padding: '8px 16px',
                width: { xs: '100%', sm: '200px' },
                height: { xs: '56px', sm: '71px' },
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}
            >
              New Lead
            </Button>
            <Box
              sx={{
                backgroundColor: '#F1F1F1',
                borderRadius: '50%',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Tooltip title="Notifications" arrow>
                <IconButton color="inherit">
                  <Notifications sx={{ color: '#686464' }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{
              borderRadius: '50%',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Tooltip title="Profile" arrow>
                <Link to="/profile">
                  <img style={{ width: "77px", height: "77px" }} src={Profile} alt="" />
                </Link>
              </Tooltip>
            </Box>
            <Box sx={{ textAlign: 'left', marginLeft: 1 }}>
              <Typography variant="body1" sx={{ color: '#656565', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                Charles Gray
              </Typography>
              <Typography variant="body2" sx={{ color: '#A3A3A3', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                charlesgray@gmail.com
              </Typography>
            </Box>
            <Tooltip title="Logout" arrow>
              <IconButton color="inherit">
                <Logout />
              </IconButton>
            </Tooltip>
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
              boxShadow: 'none'
            }
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
              boxShadow: 'none'
            }
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
          p: 3,
          backgroundColor: '#F1F1F1',
          color: '#e0e0e0',
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          borderTopLeftRadius: '30px',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
