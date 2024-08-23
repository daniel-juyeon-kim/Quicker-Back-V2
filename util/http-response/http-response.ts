const status = {
  200: "OK",
} as const;

type Code = keyof typeof status;

type Message = (typeof status)[Code];

export class HttpResponse {
  private code: Code;
  private message: Message;
  private body?: unknown;

  constructor(code: Code, body?: unknown) {
    this.code = code;
    this.message = status[code];
    this.body = body;
  }
}
