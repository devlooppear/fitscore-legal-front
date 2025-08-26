"use client";

import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextField, InputAdornment } from "@mui/material";
import { FormTextFieldProps } from "./interface";

export default function FormTextField({
  name,
  control,
  label,
  type = "text",
  error,
  icon,
}: FormTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          error={!!error}
          helperText={error}
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : undefined,
          }}
        />
      )}
    />
  );
}
