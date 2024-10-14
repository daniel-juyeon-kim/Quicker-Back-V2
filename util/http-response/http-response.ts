const status = {
  200: "OK",
} as const;

type Code = keyof typeof status;

type Message = (typeof status)[Code];

export class HttpResponse<T extends object> {
  private code: Code;
  private message: Message;
  private body?: T;

  constructor(code: Code, body?: T) {
    this.code = code;
    this.message = status[code];
    this.body = body;
  }
}
