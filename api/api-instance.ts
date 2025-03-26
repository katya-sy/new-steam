"use server";

import { cookies } from "next/headers";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export interface ApiParams extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export interface ErrorType {
  message: string;
  statusCode: number;
}

export interface ApiReturn<T> {
  data: T | null;
  error: ErrorType | null;
  success: boolean;
}

export async function apiInstance<T = void>(
  url: string,
  options: ApiParams,
): Promise<ApiReturn<T>> {
  const cookieStore = cookies();
  const authToken = cookieStore.get("token")?.value;
  const headers = new Map();

  if (authToken) {
    headers.set("Authorization", `Token ${authToken}`);
  }

  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const params: RequestInit = {
    method: options.method,
    headers: Object.fromEntries(headers),
    next: {
      revalidate: 0,
    },
  };

  if (options.body) {
    params.body =
      options.body instanceof FormData
        ? options.body
        : JSON.stringify(options.body);
  }

  const res = await fetch(apiUrl + url, params);

  if (!res.ok) {
    const error = await res.json();

    console.log("api-instance [res]", error);

    return {
      success: false,
      error: {
        message: error.detail
          ? error.detail
          : error.non_field_errors?.[0]
            ? error.non_field_errors?.[0]
            : JSON.stringify(error),
        statusCode: res.status,
      },
      data: null,
    };
  }

  if (res.status === 204) {
    return {
      success: true,
      data: null,
      error: null,
    };
  }

  return {
    success: true,
    data: (await res.json()) as T,
    error: null,
  };
}
