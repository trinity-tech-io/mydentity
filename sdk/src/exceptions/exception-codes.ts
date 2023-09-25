export enum ExceptionCode {
  NetworkError = 20001, // Time out during api call
  EmptyResponse = 20002, // null response received for unknown reason
  InvalidResponse = 20003, // Response expected from the server is not right, for example not a JSON payload
  ServerError = 20004, // Errors returned by the server, probably because of invalid query parameters (graphql)

  Unspecified = 20999,
}
