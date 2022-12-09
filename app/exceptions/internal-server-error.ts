class InternalServerError extends Error {
  constructor(errObj: Error, url: string) {
    const message = `${url}: ${errObj.toString()}`;
    super(message);
    this.name = "InternalServerError";
    this.message = message;
  }
}

export default InternalServerError;
