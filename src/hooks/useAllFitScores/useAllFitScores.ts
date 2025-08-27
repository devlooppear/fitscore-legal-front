import { useQuery } from '../useQuery/useQuery';
import { endpoints } from '@/common/constants/endpoints';
import { PaginatedFitScore } from './interface';

export function useAllFitScores(page = 1, size = 10) {
  return useQuery<PaginatedFitScore>({
    queryKey: ['allFitScores', page, size],
    endpoint: endpoints.fitscore.candidates + `?page=${page}&size=${size}`,
  });
}
