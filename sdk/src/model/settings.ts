
/**
 * Configurable settings by apps.
 */
export type SDKSettings = {
  webServiceEndpoint?: string; // Custom endpoint to reach the web service. Mostly for development purpose to reach the dev app.
  webServiceAPIEndpoint?: string; // Custom endpoint to reach the web service API. Mostly for development purpose to reach the dev API.
}

/**
 * Internal representation of all mandatory settings.
 */
export type RuntimeSettings = Required<SDKSettings>;