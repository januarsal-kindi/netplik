
type Header = {
  "Content-Type": string;
  Accept: string;
};

type Method = "GET" | "POST" | "PUT" | "DELETE";

type FetcherProps<TPayload> = {
  url: string;
  method?: Method;
  payload?: TPayload;
  headers?: Header;
  options?: RequestInit;
};

export default async function fetcher<TPayload, TResponse>({
  url,
  method = "GET",
  payload,
  headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  options,
}: FetcherProps<TPayload>): Promise<TResponse> {
  return new Promise<TResponse>((resolve, reject) => {
    fetch(`${url}`, {
      method,
      headers: {
        ...headers,
      },
      body: payload ? JSON.stringify(payload) : undefined,
      ...options,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        resolve(response.json());
      })
      .catch((error) => {
        if (error && "errorCode" in error && error.errorCode) {
          switch (error.errorCode) {
            case 44002:
              return reject({
                _tag: "UNAUTHORIZED",
                error,
              });

            default:
              return reject({
                _tag: "SERVER_ERROR",
                error,
              });
          }
        } else if (error && "statusCode" in error && error.statusCode) {
          switch (error.statusCode) {
            case 401:
              return reject({
                _tag: "UNAUTHORIZED",
                error,
              });
            case 404:
              return reject({
                _tag: "NOT_FOUND",
                error,
              });
          }
        }
        return reject({ _tag: "UNKNOWN_ERROR", error });
      });
  });
}
