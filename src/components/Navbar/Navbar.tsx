"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/provider/auth/AuthProvider";
import { Routes, RoutesByUser, PublicRoutes } from "@/common/constants/routes";
import Logo from "@/components/Logo/Logo";
import Loader from "@/components/Loader/Loader";
import systemColors from "@/common/constants/systemColors";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { routeConfigNav } from "@/common/constants/routeConfigNav";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, isAuthenticated, userType, loading } = useAuth();
  const { navTo } = useNavTo();

  const toggleDrawer = () => setMobileOpen(!mobileOpen);

  const availableRoutes = isAuthenticated
    ? userType
      ? RoutesByUser[userType]
      : []
    : PublicRoutes;

  const mainRoutes = availableRoutes.filter(
    (r) => r !== Routes.LOGIN && r !== Routes.REGISTER
  );

  const bottomRoutes = !isAuthenticated ? [Routes.LOGIN, Routes.REGISTER] : [];

  const drawer = (
    <Box
      sx={{
        width: 280,
        bgcolor: systemColors.indigo[400],
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "white",
      }}
    >
      <Box>
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
          <Logo size="medium" />
        </Box>
        <Divider sx={{ bgcolor: systemColors.blue[200] }} />
        <List>
          {mainRoutes.map((route) => (
            <ListItem key={route} disablePadding>
              <ListItemButton
                onClick={() => {
                  navTo(route);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>{routeConfigNav[route]?.icon}</ListItemIcon>
                <ListItemText primary={routeConfigNav[route]?.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Divider sx={{ bgcolor: systemColors.blue[200] }} />
        <List>
          {bottomRoutes.map((route) => (
            <ListItem key={route} disablePadding>
              <ListItemButton
                onClick={() => {
                  navTo(route);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>{routeConfigNav[route]?.icon}</ListItemIcon>
                <ListItemText primary={routeConfigNav[route]?.label} />
              </ListItemButton>
            </ListItem>
          ))}

          {isAuthenticated && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon>
                  <LogoutIcon sx={{ color: systemColors.indigo[50] }} />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {loading && <Loader inAll />}
      <AppBar position="sticky" sx={{ bgcolor: systemColors.indigo[400] }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Logo size="small" canNav />
          <IconButton color="inherit" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  );
}
