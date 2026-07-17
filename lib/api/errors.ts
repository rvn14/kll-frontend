import type { ApiErrorShape } from "@/types";

export class ApiError extends Error implements ApiErrorShape {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(error: ApiErrorShape) {
    super(error.message);
    this.name = "ApiError";
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
  }
}

export async function normalizeApiError(response: Response): Promise<ApiError> {
  let details: unknown;
  try {
    details = await response.json();
  } catch {
    details = undefined;
  }
  return new ApiError({
    message: response.status === 401 ? "Your session has expired." : "We could not complete this request.",
    status: response.status,
    details,
  });
}
