class CustomError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = this.constructor.name;
    this._status = status;
    this._innerErrors;
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
    if (!this._innerErrors) this._innerErrors = [];
    if (Array.isArray(error)) error.map((err) => this._innerErrors.push(err));
    else this._innerErrors.push(error);
  }

  get innerErrors() {
    return this._innerErrors;
  }
  
  get status() {
    return this._status;
  }
}

module.exports = CustomError;
