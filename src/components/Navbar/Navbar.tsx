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
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { useAuth } from "@/provider/auth/AuthProvider";
import { Routes, RoutesByUser, PublicRoutes } from "@/common/constants/routes";
import Logo from "@/components/Logo/Logo";
import Loader from "@/components/Loader/Loader";
import systemColors from "@/common/constants/systemColors";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { routeConfigNav } from "@/common/constants/routeConfigNav";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher";
import { getNavKey } from "@/common/utils/getNavKey";
import { useNotification } from "@/hooks/useNotification/useNotification";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout, isAuthenticated, userType, loading } = useAuth();
  const { navTo } = useNavTo();
  const { notifications, metadata } = useNotification();
  const totalNotifications = metadata?.totalItems || 0;

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

  const { t } = useTranslation("common");
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
        position: "relative",
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
                sx={{
                  "&.Mui-selected, &.Mui-selected:hover": {
                    bgcolor: systemColors.indigo[600],
                  },
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  color: "white",
                  "&:hover": {
                    bgcolor: systemColors.indigo[500],
                  },
                }}
                onClick={() => {
                  navTo(route);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
                  {routeConfigNav[route]?.icon}
                </ListItemIcon>
                <ListItemText primary={t(`navbar.${getNavKey(route)}`)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ pb: 2 }}>
        <Divider sx={{ bgcolor: systemColors.blue[200], mb: 1 }} />
        <Box
          sx={{ color: "white", width: "100%", maxWidth: "200px", mx: "auto" }}
        >
          <LanguageSwitcher />
        </Box>
        <List>
          {bottomRoutes.map((route) => (
            <ListItem key={route} disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  color: "white",
                  "&:hover": {
                    bgcolor: systemColors.indigo[500],
                  },
                }}
                onClick={() => {
                  navTo(route);
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
                  {routeConfigNav[route]?.icon}
                </ListItemIcon>
                <ListItemText primary={t(`navbar.${getNavKey(route)}`)} />
              </ListItemButton>
            </ListItem>
          ))}

          {isAuthenticated && (
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  my: 0.5,
                  color: "white",
                  "&:hover": {
                    bgcolor: systemColors.indigo[500],
                  },
                }}
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
              >
                <ListItemIcon sx={{ color: "white", minWidth: 36 }}>
                  <LogoutIcon sx={{ color: systemColors.indigo[50] }} />
                </ListItemIcon>
                <ListItemText primary={t("navbar.logout")} />
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
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isAuthenticated && (
              <IconButton
                color="inherit"
                onClick={() => navTo(Routes.NOTIFICATIONS)}
              >
                <Badge badgeContent={totalNotifications} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            )}
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={toggleDrawer}>
        {drawer}
      </Drawer>
    </>
  );
}
