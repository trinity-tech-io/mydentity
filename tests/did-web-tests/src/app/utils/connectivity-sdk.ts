import { connectivity } from "@elastosfoundation/elastos-connectivity-sdk-js";

export function unregisterAllConnectors() {
  connectivity.getAvailableConnectors().forEach(c => {
    console.log(`Unregistering connector ${c.name}`)
    connectivity.unregisterConnector(c.name);
  })
}