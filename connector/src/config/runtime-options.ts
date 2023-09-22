import { ConnectorOptions } from "./connector-options";

export type RuntimeOptions = Required<ConnectorOptions>;

export let runtimeOptions: RuntimeOptions = null;

export function setRuntimeOptions(options: RuntimeOptions) {
  runtimeOptions = options;
}