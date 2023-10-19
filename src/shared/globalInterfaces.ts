export type IErrorMessages = {
  path: string | number;
  message: string;
};

export type IErrorPayload = {
  success: boolean;
  message: string;
  errorMessages: IErrorMessages[];
  stack?: unknown;
  statusCode?: number;
};

export type IMeta = {
  total: number;
  size: number;
  page: number;
  totalPage: number;
};

export type IPagination = {
  page: number;
  size: number;
  skip: number;
  sortCondition: ISortCondition;
};

export type IPartialSearchableFields = string[];

export interface CustomJwtPayload {
  userId?: string;
  role?: string;
  iat?: string;
  exp?: string;
}

export type ISortCondition = { [key: string]: string | number };
