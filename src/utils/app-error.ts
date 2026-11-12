// classe de erro passando a mensagem e o statuscode

export class AppError {
  message: string;
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    ((this.message = message), (this.statusCode = statusCode));
  }
}
