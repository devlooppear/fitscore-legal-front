import { useQuery } from '../useQuery/useQuery';
import { endpoints } from '@/common/constants/endpoints';
import { FitScoresByClassification } from './interface';

export function useFitScoresByClassification(classification: string) {
  return useQuery<FitScoresByClassification>({
    queryKey: ['fitScoresByClassification', classification],
    endpoint: endpoints.fitscore.candidates + `?classification=${classification}`,
  });
}
