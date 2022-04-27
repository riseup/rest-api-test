const CustomError = require("../../../lib/models/custom-error");

const mockMessage = "my_custom_error";
const mockInnerErrorsObject = { errorMessage: true };
const mockInnerErrorsString = "errorMessage";
const mockInnerErrorsArray = [{ errorMessage: 1 }, { errorMessage: 2 }];

describe("custom-error.js", () => {
  describe("test custom error", () => {
    describe("given an object as innerError", () => {
      it("should return array with the object", async () => {
        const error = new CustomError(mockMessage);
        error.innerErrors = mockInnerErrorsObject;
        expect(error.innerErrors).toEqual([mockInnerErrorsObject]);
      });
    });
    describe("given a string as innerError", () => {
      it("should return array with the string", async () => {
        const error = new CustomError(mockMessage);
        error.innerErrors = mockInnerErrorsString;
        expect(error.innerErrors).toEqual([mockInnerErrorsString]);
      });
    });
    describe("given an array as innerError", () => {
      it("should return new array with the mapped array ", async () => {
        const error = new CustomError(mockMessage);
        error.innerErrors = mockInnerErrorsString;
        expect(error.innerErrors).toEqual([mockInnerErrorsString]);
      });
    });
  });
});
