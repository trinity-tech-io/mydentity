import moment from "moment";

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

    public init(originalConsole: Console) {
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

    public log(module: string, ...args: any) {
        this.originalDebugLog.apply(this.originalConsole, [
            "%c" + moment(new Date().getTime()).format('HH:mm:ss.SSS') + " " + module.toUpperCase() + "*", 'background: #008730; color: #FFF; font-weight:bold; padding:5px;',
            ...args]);
    }

    public warn(module: string, ...args: any) {
        this.originalDebugWarn.apply(this.originalConsole, [
            "%c" + moment(new Date().getTime()).format('HH:mm:ss.SSS') + " " + module.toUpperCase() + "* WARNING", 'background: #d59100; color: #FFF; font-weight:bold; padding:5px;',
            ...args]);
    }

    public error(module: string, ...args: any) {
        this.originalDebugErr.apply(this.originalConsole, [
            "%c" + moment(new Date().getTime()).format('HH:mm:ss.SSS') + " " + module.toUpperCase() + "* ERROR", 'background: #b30202; color: #FFF; font-weight:bold; padding:5px;',
            ...args]);
    }

    public test(module: string, ...args: any) {
        this.originalDebugLog.apply(this.originalConsole, [
            "%c" + moment(new Date().getTime()).format('HH:mm:ss.SSS') + " " + module.toUpperCase() + "* TEST", 'background: #7B68EE; color: #FFF; font-weight:bold; padding:5px;',
            ...args]);
    }
}

export const logger = new _Logger();