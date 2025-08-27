import { useQuery } from '../useQuery/useQuery';
import { endpoints } from '@/common/constants/endpoints';
import { MyFitScore } from './interface';

export function useMyFitScore() {
  return useQuery<MyFitScore>({
    queryKey: ['myFitScore'],
    endpoint: endpoints.fitscore.me,
  });
}
