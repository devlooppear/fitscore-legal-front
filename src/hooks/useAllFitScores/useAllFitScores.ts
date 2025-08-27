import { useQuery } from "../useQuery/useQuery";
import { endpoints } from "@/common/constants/endpoints";
import { PaginatedFitScore } from "./interface";
import { format } from "date-fns";

export function useAllFitScores(page = 1, size = 10) {
  const query = useQuery<PaginatedFitScore>({
    queryKey: ["allFitScores", page, size],
    endpoint: endpoints.fitscore.candidates + `?page=${page}&size=${size}`,
  });

  const mappedData = query.data?.data.map((fitScore) => ({
    id: fitScore.id,
    userName: fitScore.user.name,
    userEmail: fitScore.user.email,
    performance: fitScore.performance,
    energy: fitScore.energy,
    culture: fitScore.culture,
    totalScore: fitScore.totalScore,
    classification: fitScore.classification,
    createdAt: format(new Date(fitScore.createdAt), "dd/MM/yyyy HH:mm"),
  }));

  const totalScore =
    mappedData?.reduce((sum, fitScore) => sum + fitScore.totalScore, 0) || 0;

  const mappedMetadata = query.data?.metadata
    ? {
        page: query.data.metadata.page,
        size: query.data.metadata.size,
        totalItems: query.data.metadata.totalItems,
        totalPages: query.data.metadata.totalPages,
        hasNextPage: query.data.metadata.hasNextPage,
        hasPreviousPage: query.data.metadata.hasPreviousPage,
      }
    : {
        page: 1,
        size: 10,
        totalItems: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };

  return {
    ...query,
    data: {
      ...query.data,
      data: mappedData,
      metadata: mappedMetadata,
      totalScore,
    },
  };
}
