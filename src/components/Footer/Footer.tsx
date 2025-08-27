"use client";

import React from "react";
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import Logo from "@/components/Logo/Logo";
import systemColors from "@/common/constants/systemColors";
import { Routes } from "@/common/constants/routes";
import { useAuth } from "@/provider/auth/AuthProvider";
import { UserType } from "@/enum/userType";
import { socialLinks } from "@/common/constants/socialLinks";

export default function Footer() {
  const { userType } = useAuth();

  const quickLinks = userType
    ? [
        { label: "Notificações", href: Routes.NOTIFICATIONS },
        { label: "Perfil", href: Routes.PROFILE },
        ...(userType === UserType.RECRUITER
          ? [{ label: "Dashboard", href: Routes.DASHBOARD }]
          : []),
      ]
    : [
        { label: "Login", href: Routes.LOGIN },
        { label: "Cadastro", href: Routes.REGISTER },
      ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: systemColors.indigo[800],
        color: systemColors.indigo[50],
        py: 6,
        px: { xs: 3, sm: 6 },
      }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={4}
        mb={4}
      >
        <Box
          flex="1 1 250px"
          display="flex"
          flexDirection="column"
          alignItems={{ xs: "center", sm: "flex-start" }}
          gap={2}
        >
          <Logo size={60} />
          <Box display="flex" gap={1}>
            {socialLinks.map(({ icon, href }, idx) => (
              <MuiLink
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: systemColors.indigo[50],
                  "&:hover": { color: systemColors.blue[300] },
                }}
              >
                <IconButton sx={{ color: "inherit", fontSize: 24 }}>
                  {icon}
                </IconButton>
              </MuiLink>
            ))}
          </Box>
        </Box>

        <Box
          flex="1 1 150px"
          display="flex"
          flexDirection="column"
          gap={1}
          alignItems={{ xs: "center", sm: "flex-start" }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Links Rápidos
          </Typography>
          {quickLinks.map(({ label, href }, idx) => (
            <MuiLink
              key={idx}
              href={href}
              sx={{
                color: systemColors.indigo[50],
                textDecoration: "none",
                "&:hover": {
                  color: systemColors.blue[300],
                  textDecoration: "underline",
                },
              }}
            >
              {label}
            </MuiLink>
          ))}
        </Box>

        <Box
          flex="1 1 200px"
          display="flex"
          flexDirection="column"
          gap={1}
          alignItems={{ xs: "center", sm: "flex-start" }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            Contato
          </Typography>
          <Typography variant="body2">
            iago.profissional.developer@gmail.com
          </Typography>
          <Typography variant="body2">+55 (11) 94186-7093</Typography>
        </Box>
      </Box>

      <Divider sx={{ bgcolor: systemColors.indigo[50], opacity: 0.3, mb: 2 }} />

      <Typography
        variant="body2"
        align="center"
        sx={{ color: systemColors.indigo[50], opacity: 0.8 }}
      >
        © {new Date().getFullYear()} FitScore Legal
      </Typography>
    </Box>
  );
}
