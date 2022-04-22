class CustomError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = this.constructor.name;
    this._status = status;
    this._innerErrors = undefined;
  }

  get toJson() {
    return {
      error: {
        message: this.message,
        status: this._status,
        innerErrors: this._innerErrors
      }
    };
  }

  set innerErrors(error) {
    if (this._innerErrors === undefined) this._innerErrors = [];
    if (Array.isArray(error)) error.map((err) => this._innerErrors.push(err));
    else this._innerErrors.push(error);
  }

  get status() {
    return this._status;
  }
}

module.exports = CustomError;
