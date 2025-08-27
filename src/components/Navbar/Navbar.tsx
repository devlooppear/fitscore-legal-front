"use client";

import React from "react";
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
  ListItemText,
  Divider,
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

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/provider/auth/AuthProvider";
import { Routes, RoutesByUser, PublicRoutes } from "@/common/constants/routes";
import { UserType } from "@/enum/userType";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { logout, isAuthenticated, userType } = useAuth();
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
  };

  const availableRoutes = isAuthenticated
    ? userType
      ? RoutesByUser[userType]
      : []
    : PublicRoutes;

  const routeConfig: Record<string, { label: string; icon: React.ReactNode }> =
    {
      [Routes.HOME]: { label: "Início", icon: <HomeIcon /> },
      [Routes.DASHBOARD]: { label: "Dashboard", icon: <DashboardIcon /> },
      [Routes.FORM_FITSCORE]: { label: "Fit Score", icon: <AssignmentIcon /> },
      [Routes.PROFILE]: { label: "Perfil", icon: <PersonIcon /> },
      [Routes.NOTIFICATIONS]: {
        label: "Notificações",
        icon: <NotificationsIcon />,
      },
      [Routes.LOGIN]: { label: "Login", icon: <LoginIcon /> },
      [Routes.REGISTER]: { label: "Cadastro", icon: <AppRegistrationIcon /> },
      [Routes.INTRODUCTION]: { label: "Introdução", icon: <InfoIcon /> },
    };

  const drawer = (
    <List sx={{ width: 250 }}>
      {availableRoutes.map((route) => (
        <ListItem key={route} disablePadding>
          <ListItemButton
            component={Link}
            href={route}
            selected={pathname === route}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>{routeConfig[route]?.icon}</ListItemIcon>
            <ListItemText primary={routeConfig[route]?.label} />
          </ListItemButton>
        </ListItem>
      ))}

      {isAuthenticated && (
        <>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Sair" />
            </ListItemButton>
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            FitScore Legal
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
