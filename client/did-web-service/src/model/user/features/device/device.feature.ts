import { gql } from "@apollo/client";
import { gqlDeviceFields } from "@graphql/device.fields";
import { Device } from "@model/device/device";
import { DeviceDTO } from "@model/device/device.dto";
import { withCaughtAppException } from "@services/error.service";
import { getApolloClient } from "@services/graphql.service";
import { logger } from "@services/logger";
import { LazyBehaviorSubjectWrapper } from "@utils/lazy-behavior-subject";
import { User } from "../../user";
import { UserFeature } from "../user-feature";

export class DeviceFeature implements UserFeature {
  private _devices$ = new LazyBehaviorSubjectWrapper<Device[]>([], () => this.fetchDevices());
  public get devices$() { return this._devices$.getSubject(); }

  constructor(protected user: User) {
  }

  private async fetchDevices(): Promise<Device[]> {
    logger.log("devices", "Fetching user devices");

    const { data } = await withCaughtAppException(() => {
      return getApolloClient().query<{ devices: DeviceDTO[] }>({
        query: gql`
        query ListDevices {
          devices {
            ${gqlDeviceFields}
          }
        }
      `
      });
    });

    if (data && data.devices) {
      const devices = await Promise.all(data!.devices.map(device => Device.fromJson(device)));
      logger.log("devices", "Fetched devices:", devices);
      return devices;
    }

    return null;
  }
}