import { useEffect, useReducer } from "react";
import { Listener, Observable } from "../utils/observable";

export function useObservable<Values extends Object>(
  observable: Observable<Values>,
  reducer?: (prev: Values, curr: Values) => Values
): [Values, Listener<Values>] {
  const [values, setValues] = useReducer((prev: Values, curr: Values) => {
    return reducer ? reducer(prev, curr) : curr;
  }, observable.get());

  useEffect(() => {
    const listener = observable.subscribe(setValues);
    return () => {
      listener && listener();
    };
  }, [observable]);

  return [values, observable.set.bind(observable)];
}
