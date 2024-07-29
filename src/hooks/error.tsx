import { Observable } from "../utils/observable";
import { useObservable } from "./observable";

export const defaultErrorValue: { error?: Error } = {};
export const ObservableError = new Observable(defaultErrorValue);

export class GlobalError {
  static error?: Error;
  static Values = new Observable({
    error: GlobalError.error,
  });

  static setError(error?: (typeof GlobalError)["error"]) {
    GlobalError.Values.setValue("error", error);
  }
}

export function setApiError(errors: { message: string }[]) {
  GlobalError.setError(
    new Error(errors.map((item) => item.message).join("\n"))
  );
  return Promise.reject(errors);
}

export function useError() {
  const [errorValue] = useObservable(GlobalError.Values);
  const { error } = errorValue;
  return error;
}
