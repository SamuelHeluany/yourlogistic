import validator from "validator";
import { AppError } from "./app-error.js";

export const checkIfIdIsValid = (userId: string) => validator.isUUID(userId);

export const invalidIdResponse = () => {
  throw new AppError("The provided ID is not valid.", 400);
};
