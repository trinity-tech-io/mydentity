import { DeviceDTO } from "./device.dto";

export class Device {
  id: string;
  createdAt: Date;
  userAgent: string;
  name: string;

  public static async fromJson(json: DeviceDTO): Promise<Device> {
    const device = new Device();
    Object.assign(device, json);

    device.createdAt = new Date(json.createdAt);

    return device;
  }

  public equals(otherDevice: Device): boolean {
    return this.id === otherDevice.id;
  }
}