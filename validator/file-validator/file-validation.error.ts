export class FileValidationError {
  type = "field";
  location = "file";
  path = "req.file";

  constructor(public msg: string) {}
}
