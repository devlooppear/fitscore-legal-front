"use client";

import { Box, Card, Typography, List, ListItem, Divider } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import systemColors from "@/common/constants/systemColors";
import { useNotification } from "@/hooks/useNotification/useNotification";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth/useAuth";
import { UserType } from "@/enum/userType";
import {
  FitScoreDescriptions,
  FitScoreClassification,
} from "@/enum/FitScoreClassification";
import { useTranslation } from "react-i18next";

export default function NotificationsPage() {
  const { t } = useTranslation("notifications");

  const { userType } = useAuth();
  const { notifications, metadata } = useNotification();

  const allNotifications = notifications;

  const formatType = (type: string): string => {
    return FitScoreDescriptions[type as FitScoreClassification] || type;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    date.setHours(date.getHours() - 3);
    return format(date, "dd/MM/yyyy, HH:mm:ss");
  };

  const formatMessage = (message: string): string => {
    return message.replace(/FIT_([A-Z_]+)/g, (_, p1) => {
      const classification = `FIT_${p1}` as FitScoreClassification;
      return FitScoreDescriptions[classification] || p1;
    });
  };

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
        {t("notificationsTitle")}
      </Typography>

      {!allNotifications.length ? (
        <Typography sx={{ color: systemColors.indigo[600] }}>
          {t("noNotifications")}
        </Typography>
      ) : userType === UserType.RECRUITER ? (
        <Box sx={{ width: "100%", maxWidth: 800 }}>
          <DataGrid
            rows={allNotifications.map((n, index) => ({
              id: index,
              type: formatType(n.type),
              message: formatMessage(n.message),
              sentAt: formatDate(n.sentAt),
            }))}
            columns={[
              {
                field: "type",
                headerName: t("type"),
                width: 200,
                headerClassName: "data-grid-header",
                cellClassName: "data-grid-cell",
              },
              {
                field: "message",
                headerName: t("message"),
                width: 400,
                headerClassName: "data-grid-header",
                cellClassName: "data-grid-cell",
              },
              {
                field: "sentAt",
                headerName: t("sentAt"),
                width: 200,
                headerClassName: "data-grid-header",
                cellClassName: "data-grid-cell",
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
      ) : (
        <List sx={{ width: "100%", maxWidth: 600 }}>
          {allNotifications.map((n) => (
            <Card
              key={n.id}
              sx={{
                mb: 2,
                p: 2,
                bgcolor: systemColors.indigo[100],
                boxShadow: `0px 2px 8px ${systemColors.indigo[200]}`,
              }}
            >
              <ListItem
                disablePadding
                sx={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Typography
                  sx={{ fontWeight: "bold", color: systemColors.indigo[700] }}
                >
                  {formatType(n.type)}
                </Typography>
                <Typography sx={{ color: systemColors.indigo[800], mb: 1 }}>
                  {formatMessage(n.message)}
                </Typography>
                <Divider
                  sx={{
                    width: "100%",
                    mb: 1,
                    bgcolor: systemColors.indigo[300],
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{ color: systemColors.indigo[500] }}
                >
                  {formatDate(n.sentAt)}
                </Typography>
              </ListItem>
            </Card>
          ))}
        </List>
      )}
    </Box>
  );
}
