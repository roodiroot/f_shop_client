export type ApiResult<T> = {
  ok: boolean;
  data?: T;
  error?: string;
};
