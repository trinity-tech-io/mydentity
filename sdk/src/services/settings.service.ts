import { defaultSettings } from "@config/default-settings";
import { SDKSettings } from "@model/settings";

export let runtimeSettings = defaultSettings;

/**
 * Exposed configuration method to let apps customize some of the default settings.
 */
export function configure(userSettings: SDKSettings) {
  // Merge existing settings with new user settings
  runtimeSettings = Object.assign({}, defaultSettings, userSettings);
}