import { Interfaces } from "@elastosfoundation/elastos-connectivity-sdk-js";
import moment from "moment";

const modulesColors: { [module: string]: string } = {
    "default": "#008730",
    "hive": "#5226af",
    "connectivity": "#d17506"
}

function getBackgroundColor(module: string): string {
    return modulesColors[module] || modulesColors.default;
}

type DevLogType = "log" | "warn" | "error" | "test";
type DevLogEntry = {
    time: string;
    type: DevLogType;
    module: string;
    entries: (string | object)[]; // all console.log params, either as string, or as stringified objects. Classes with circular dependencies are skipped.
}

class _Logger {
    private originalConsole: any = null;
    private originalDebugLog: (...args: any[]) => void;
    private originalDebugWarn: (...args: any[]) => void;
    private originalDebugErr: (...args: any[]) => void;

    public init(originalConsole: Console): void {
        this.originalConsole = originalConsole;

        // Replace original log methods with placeholders to warn that the migration is needed
        this.originalDebugLog = this.originalConsole.log;
        this.originalDebugWarn = this.originalConsole.warn;
        this.originalDebugErr = this.originalConsole.error;

        /* this.originalConsole.log = (...args: any[]) => {
              this.originalDebugLog.apply(this.originalConsole, ["%cConvert-To-Logger", 'background: #3078c9; color: #FFF; font-weight:bold; padding:5px;', ...args]);
          }
          this.originalConsole.warn = (...args: any[]) => {
              this.originalDebugWarn.apply(this.originalConsole, ["%cConvert-To-Logger WARNING", 'background: #3078c9; color: #FFF; font-weight:bold; padding:5px;', ...args]);
          }
          this.originalConsole.error = (...args: any[]) => {
              this.originalDebugErr.apply(this.originalConsole, ["%cConvert-To-Logger ERROR", 'background: #3078c9; color: #FFF; font-weight:bold; padding:5px;', ...args]);
          } */
    }

    public log(module: string, ...args: any): void {
        const bgColor = getBackgroundColor(module);
        this.originalDebugLog.apply(this.originalConsole, [
            "%c" + moment(new Date().getTime()).format('HH:mm:ss.SSS') + " " + module.toUpperCase() + "*", `background: ${bgColor}; color: #FFF; font-weight:bold; padding:5px;`,
            ...args]);
    }

    public warn(module: string, ...args: any): void {
        const bgColor = getBackgroundColor(module);
        this.originalDebugWarn.apply(this.originalConsole, [
            "%c" + moment(new Date().getTime()).format('HH:mm:ss.SSS') + " " + module.toUpperCase() + "*", `background: ${bgColor}; color: #FFF; font-weight:bold; padding:5px;`,
            ...args]);
    }

    public error(module: string, ...args: any): void {
        const bgColor = getBackgroundColor(module);
        this.originalDebugErr.apply(this.originalConsole, [
            "%c" + moment(new Date().getTime()).format('HH:mm:ss.SSS') + " " + module.toUpperCase() + "*", `background: ${bgColor}; color: #FFF; font-weight:bold; padding:5px;`,
            ...args]);
    }

    public test(module: string, ...args: any): void {
        const bgColor = getBackgroundColor(module);
        this.originalDebugLog.apply(this.originalConsole, [
            "%c" + moment(new Date().getTime()).format('HH:mm:ss.SSS') + " " + module.toUpperCase() + "* TEST", `background: ${bgColor}; color: #FFF; font-weight:bold; padding:5px;`,
            ...args]);
    }
}

export const logger = new _Logger();

export class DIDWebConnectivityLogger implements Interfaces.ILogger {
    log(...args: any) {
        logger.log.apply(logger, ["connectivity", ...args]);
    }
    warn(...args: any) {
        logger.warn.apply(logger, ["connectivity", ...args]);
    }
    error(...args: any) {
        logger.error.apply(logger, ["connectivity", ...args]);
    }
}