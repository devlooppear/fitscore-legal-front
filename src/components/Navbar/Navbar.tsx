"use client";

import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import { useAuth } from "@/hooks/useAuth/useAuth";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout, isAuthenticated } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
  };

  const drawer = (
    <List>
      <ListItem disablePadding>
        <ListItemButton>
          <Typography>Menu Item</Typography>
        </ListItemButton>
      </ListItem>

      {isAuthenticated && (
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <Typography>Sair</Typography>
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Navbar
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
}
