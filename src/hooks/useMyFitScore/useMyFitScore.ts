import { useQuery } from "@/hooks/useQuery/useQuery";
import { endpoints } from "@/common/constants/endpoints";
import { MyFitScore } from "./interface";

export function useMyFitScore() {
  const query = useQuery<MyFitScore>({
    queryKey: ["myFitScore"],
    endpoint: endpoints.fitscore.me,
  });

  const myFitScore = query.data
    ? {
        id: query.data.id,
        userId: query.data.userId,
        performance: query.data.performance,
        energy: query.data.energy,
        culture: query.data.culture,
        totalScore: query.data.totalScore,
        classification: query.data.classification,
        createdAt: query.data.createdAt,

        user: query.data.user
          ? {
              id: query.data.user.id,
              name: query.data.user.name,
              email: query.data.user.email,
              role: query.data.user.role,
              createdAt: query.data.user.createdAt,
            }
          : null,

        hasFitScore:
          query.data !== undefined &&
          query.data !== null &&
          Object.keys(query.data).length > 0,
      }
    : { hasFitScore: false, user: null };

  return {
    ...query,
    myFitScore,
  };
}
