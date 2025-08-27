import { FitScore } from '../useCreateFitScore/interface';

export interface PaginationMeta {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedFitScore {
  data: FitScore[];
  metadata: PaginationMeta;
}
