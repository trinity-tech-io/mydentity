import FIFO from 'fast-fifo';

export interface SocketteOptions {
  protocols?: string | string[];
  timeout?: number; // milliseconds
  maxAttempts?: number;
  onopen?: (ev: Event) => any;
  onmessage?: (ev: MessageEvent) => any;
  onreconnect?: (ev: Event | CloseEvent) => any;
  onmaximum?: (ev: CloseEvent) => any;
  onclose?: (ev: CloseEvent) => any;
  onerror?: (ev: Event) => any;
}

/*
 * Improved version of https://github.com/lukeed/sockette for Mingler
 */
export class Sockette {
  private ws: WebSocket;
  private num = 0;
  private timer?: any;
  private opts: SocketteOptions;
  private isReady = false;
  private fifo = new FIFO<any>(); // FIFO queue for messages

  constructor(private url: string, opts: SocketteOptions = {}) {
    this.opts = { maxAttempts: Infinity, ...opts };
    this.open(); // init
  }

  public ready(): boolean {
    return this.isReady;
  }

  private open(): void {
    this.ws = new WebSocket(this.url, this.opts.protocols || []);

    this.ws.onmessage = (message): void => {
      this.opts.onmessage?.(message);
    }

    this.ws.onopen = (e): void => {
      this.opts.onopen?.(e);
      this.num = 0;
      this.isReady = true;
      this.flushMessages();
    };

    this.ws.onclose = (e): void => {
      this.isReady = false;
      if (e.code === 1000 || e.code === 1001 || e.code === 1005 || e.code === 1006) {
        this.reconnect(e);
      }
      this.opts.onclose?.(e);
    };

    this.ws.onerror = (e: any): void => {
      if (e && e.code === 'ECONNREFUSED') {
        this.reconnect(e);
      } else {
        (this.opts.onerror || ((): void => { }))(e);
      }
    };
  }

  private reconnect(e: CloseEvent): void {
    if (this.num++ < this.opts.maxAttempts) {
      this.timer = setTimeout(() => {
        this.opts.onreconnect?.(e);
        this.open();
      }, this.opts.timeout || 1000);
    } else {
      this.opts.onmaximum?.(e);
    }
  }

  public json(x: any): void {
    this.send(JSON.stringify(x));
  }

  public send(x: any): void {
    this.fifo.push(x);
    this.flushMessages();
  }

  private flushMessages(): void {
    if (this.ready()) {
      while (!this.fifo.isEmpty()) {
        const msg = this.fifo.shift();
        this.ws.send(msg);
      }
    }
  }

  public close(code?: number, reason?: string): void {
    clearTimeout(this.timer);
    this.timer = null;
    this.ws.close(code || 1000, reason);
  }
}