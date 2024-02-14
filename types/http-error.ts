export interface HTTPError extends Error {
  status?: number;
}
