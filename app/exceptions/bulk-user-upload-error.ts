import { map } from "lodash";
import { ValidationError, UniqueConstraintError } from "sequelize";

class BulkUserUploadError extends Error {
  errors: string[];
  constructor(rowNumber: number, errorObject: any) {
    super(errorObject.message);
    if (errorObject instanceof ValidationError || UniqueConstraintError) {
      this.errors = map(errorObject.errors, (error) => {
        const newMessage = `Row ${rowNumber}: ${error.message}`;
        error.message = newMessage;
        return error;
      });
    } else {
      this.errors = [`Row ${rowNumber}: ${errorObject.message}`];
    }
  }
}

export default BulkUserUploadError;
