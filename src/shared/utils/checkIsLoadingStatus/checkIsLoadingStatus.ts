import requestStatusCodes from '../../const/requestStatusCodes.ts';

export type RequestStatuses = 'pending' | 'fulfilled' | 'rejected' | 'idle';

export const checkIsLoading = (...args: RequestStatuses[]) =>
  args.some((item) => item === requestStatusCodes.pending);

export const checkIsLoaded = (...args: RequestStatuses[]) =>
  args.every((item) => item === requestStatusCodes.fulfilled);
