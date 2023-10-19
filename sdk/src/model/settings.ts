
/**
 * Configurable settings by apps.
 */
export type SDKSettings = {
  accessKey: string; // Developer access key generated on Mydentity.
  appDID: string; // DID of the application that is operating the SDK. This application must belong to the developer account that generates the access key
  webServiceEndpoint?: string; // Custom endpoint to reach the web service. Mostly for development purpose to reach the dev app.
  webServiceAPIEndpoint?: string; // Custom endpoint to reach the web service API. Mostly for development purpose to reach the dev API.
}

/**
 * Internal representation of all mandatory settings.
 */
export type RuntimeSettings = Required<SDKSettings>;
