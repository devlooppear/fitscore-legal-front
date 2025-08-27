"use client";

import React from "react";
import { Select, MenuItem, Box, Typography, Paper } from "@mui/material";
import { LANGUAGE_OPTIONS, Languages } from "@/enum/language";
import { getAppLanguage, setAppLanguage } from "@/common/utils/language";
import systemColors from "@/common/constants/systemColors";

export default function LanguageSwitcher() {
  const [language, setLanguage] = React.useState<Languages>(getAppLanguage());

  const handleChange = (event: any) => {
    const newLang = event.target.value as Languages;
    setLanguage(newLang);
    setAppLanguage(newLang);
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: systemColors.indigo[500],
        px: 2,
        py: 0.5,
        minWidth: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 2px 8px ${systemColors.indigo[300]}`,
      }}
    >
      <Select
        value={language}
        onChange={handleChange}
        variant="standard"
        disableUnderline
        size="small"
        sx={{
          minWidth: 110,
          fontSize: "0.95rem",
          bgcolor: 'transparent',
          borderRadius: 2,
          fontWeight: 500,
          color: systemColors.blue[50],
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            py: 0.5,
            color: systemColors.blue[50],
          },
        }}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <MenuItem key={option.code} value={option.code} sx={{ display: 'flex', alignItems: 'center', gap: 1, color: systemColors.blue[700], fontWeight: 500 }}>
            <Typography component="span" sx={{ fontSize: "1.2rem" }}>
              {option.flag}
            </Typography>
            <Typography component="span" sx={{ fontWeight: 500 }}>
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
