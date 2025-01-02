export interface ApiResponse<T> {
  message: string;
  status: ApiStatus;
  errors: string[];
  data: T;
}

export enum ApiStatus {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
}
