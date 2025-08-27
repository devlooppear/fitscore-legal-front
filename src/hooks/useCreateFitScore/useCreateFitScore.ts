import { useMutation } from '../useMutation/useMutation';
import { endpoints } from '@/common/constants/endpoints';
import { FitScore, FitScoreInput } from './interface';

export function useCreateFitScore() {
  return useMutation<FitScore, FitScoreInput>({
    endpoint: endpoints.fitscore.create,
    method: 'POST',
  });
}
