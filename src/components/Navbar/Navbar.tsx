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
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import InfoIcon from "@mui/icons-material/Info";

import { useAuth } from "@/provider/auth/AuthProvider";
import { Routes, RoutesByUser, PublicRoutes } from "@/common/constants/routes";
import { UserType } from "@/enum/userType";
import Logo from "@/components/Logo/Logo";
import systemColors from "@/common/constants/systemColors";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, isAuthenticated, userType } = useAuth();
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

  const routeConfig: Record<string, { label: string; icon: React.ReactNode }> =
    {
      [Routes.HOME]: {
        label: "Início",
        icon: <HomeIcon sx={{ color: "white" }} />,
      },
      [Routes.DASHBOARD]: {
        label: "Dashboard",
        icon: <DashboardIcon sx={{ color: "white" }} />,
      },
      [Routes.FORM_FITSCORE]: {
        label: "Fit Score",
        icon: <AssignmentIcon sx={{ color: "white" }} />,
      },
      [Routes.PROFILE]: {
        label: "Perfil",
        icon: <PersonIcon sx={{ color: "white" }} />,
      },
      [Routes.NOTIFICATIONS]: {
        label: "Notificações",
        icon: <NotificationsIcon sx={{ color: "white" }} />,
      },
      [Routes.LOGIN]: {
        label: "Login",
        icon: <LoginIcon sx={{ color: systemColors.blue[50] }} />,
      },
      [Routes.REGISTER]: {
        label: "Cadastro",
        icon: <AppRegistrationIcon sx={{ color: systemColors.blue[50] }} />,
      },
      [Routes.INTRODUCTION]: {
        label: "Introdução",
        icon: <InfoIcon sx={{ color: "white" }} />,
      },
    };

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
                <ListItemIcon>{routeConfig[route]?.icon}</ListItemIcon>
                <ListItemText primary={routeConfig[route]?.label} />
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
                <ListItemIcon>{routeConfig[route]?.icon}</ListItemIcon>
                <ListItemText primary={routeConfig[route]?.label} />
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
      <AppBar position="sticky" sx={{ bgcolor: systemColors.indigo[400] }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Logo size="small" canNav/>
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
