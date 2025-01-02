interface RequestOptions extends RequestInit {
  headers?: HeadersInit;
}

interface ApiErrorResponse {
  message: string;
}

const apiClient = async (
  pathname: string,
  options: RequestOptions = {},
  shouldThrowError: boolean = true,
  defaultReturn: any = null // Default value for defaultReturn
): Promise<any> => {
  const defaultHeaders: Record<string, string> = {};

  if (!(options.body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const requestOptions: RequestOptions = {
    method: "GET",
    credentials: "include",
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVERURL}${pathname}`,
      requestOptions
    );

    if (!response.ok) {
      const error: ApiErrorResponse = await response.json();
      if (shouldThrowError) {
        throw new Error(error.message || "Something went wrong");
      } else {
        return defaultReturn; // Return defaultReturn if shouldThrowError is false
      }
    }

    return response.json();
  } catch (error) {
    if (shouldThrowError) {
      throw new Error("Network error: Unable to reach the server");
    }
    console.error(error);
    return defaultReturn; // Return defaultReturn in case of a network error if shouldThrowError is false
  }
};

export default apiClient;
