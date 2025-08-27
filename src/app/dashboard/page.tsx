"use client";

import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import systemColors from "@/common/constants/systemColors";
import { useAllFitScores } from "@/hooks/useAllFitScores/useAllFitScores";
import { useTranslation } from "react-i18next";
import {
  FitScoreClassification,
  FitScoreDescriptions,
} from "@/enum/FitScoreClassification";
import * as XLSX from "xlsx";
import { useState } from "react";

const formatClassification = (
  classification: FitScoreClassification
): string => {
  return FitScoreDescriptions[classification] || classification;
};

const getScoreColor = (score: number): string => {
  if (score >= 80) return "green";
  if (score >= 50) return "yellow";
  return "red";
};

const handleDownload = (rows: any[], format: "xlsx" | "csv") => {
  if (format === "xlsx") {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "FitScores");
    XLSX.writeFile(workbook, "FitScores.xlsx");
  } else if (format === "csv") {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "FitScores.csv";
    link.click();
  }
};

export default function DashboardPage() {
  const { t } = useTranslation("dashboard");
  const { data: fitScoresData, isLoading, isError } = useAllFitScores();
  const [format, setFormat] = useState<"xlsx" | "csv">("xlsx");

  const rows = fitScoresData?.data || [];
  const metadata = fitScoresData?.metadata || {};

  return (
    <Box
      sx={{
        py: 8,
        px: 3,
        minHeight: "100vh",
        bgcolor: systemColors.indigo[50],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: systemColors.indigo[800], mb: 4 }}
      >
        {t("dashboardTitle")}
      </Typography>

      <Box sx={{ width: "100%", maxWidth: 1000, mb: 2 }}>
        <select
          value={format}
          onChange={(e: any) => setFormat(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "5px",
            border: `1px solid ${systemColors.indigo[300]}`,
            backgroundColor: systemColors.indigo[50],
            color: systemColors.indigo[800],
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          <option value="xlsx">XLSX</option>
          <option value="csv">CSV</option>
        </select>
        <button
          onClick={() => handleDownload(rows, format)}
          style={{
            padding: "10px 20px",
            backgroundColor: systemColors.indigo[600],
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {t("generateReport")}
        </button>
      </Box>

      <Box sx={{ width: "100%", maxWidth: 1000 }}>
        <DataGrid
          rows={rows.map((fitScore) => ({
            id: fitScore.id,
            userName: fitScore.userName,
            userEmail: fitScore.userEmail,
            performance: fitScore.performance,
            energy: fitScore.energy,
            culture: fitScore.culture,
            totalScore: fitScore.totalScore.toFixed(2),
            classification: fitScore.classification as FitScoreClassification,
          }))}
          columns={[
            {
              field: "userName",
              headerName: t("userName"),
              width: 200,
              headerClassName: "data-grid-header",
              cellClassName: "data-grid-cell",
            },
            {
              field: "userEmail",
              headerName: t("userEmail"),
              width: 250,
              headerClassName: "data-grid-header",
              cellClassName: "data-grid-cell",
            },
            {
              field: "performance",
              headerName: t("performance"),
              width: 150,
              headerClassName: "data-grid-header",
              cellClassName: "data-grid-cell",
            },
            {
              field: "energy",
              headerName: t("energy"),
              width: 150,
              headerClassName: "data-grid-header",
              cellClassName: "data-grid-cell",
            },
            {
              field: "culture",
              headerName: t("culture"),
              width: 150,
              headerClassName: "data-grid-header",
              cellClassName: "data-grid-cell",
            },
            {
              field: "totalScore",
              headerName: t("totalScore"),
              width: 150,
              headerClassName: "data-grid-header",
              cellClassName: "data-grid-cell",
            },
            {
              field: "classification",
              headerName: t("classification"),
              width: 200,
              headerClassName: "data-grid-header",
              cellClassName: "data-grid-cell",
              renderCell: (params) => formatClassification(params.value),
              filterable: true,
              type: "singleSelect",
              valueOptions: Object.values(FitScoreClassification),
            },
          ]}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: metadata.size,
                page: metadata.page - 1,
              },
            },
          }}
          sx={{
            "& .data-grid-header": {
              backgroundColor: systemColors.indigo[100],
              color: systemColors.indigo[800],
              fontWeight: "bold",
            },
            "& .data-grid-cell": {
              color: systemColors.indigo[700],
            },
            boxShadow: `0px 2px 8px ${systemColors.indigo[200]}`,
            border: `1px solid ${systemColors.indigo[300]}`,
            borderRadius: "8px",
          }}
        />
      </Box>
    </Box>
  );
}
