export type Listener<T> = (value: T) => void;

export class Observable<T extends Object> {
  listeners: Listener<T>[] = [];
  protected values: T;

  constructor(values: T) {
    this.values = values;
    return this;
  }

  get() {
    return { ...this.values };
  }

  getValue<K extends keyof T>(key: K) {
    return this.values[key];
  }

  clone(...exclude: Listener<T>[]) {
    const clone = new Observable<T>(this.values);
    clone.listeners = this.exclude(...exclude);
    return clone;
  }

  set(newValues = this.values) {
    // if (this.values === newValue) return this;
    this.values = { ...newValues };
    this.listeners.forEach((l) => l(this.values));
    return this;
  }

  setValue<K extends keyof T>(key: K, value: T[K]) {
    return this.set({ ...this.values, [key]: value });
  }

  exclude(...listeners: Listener<T>[]) {
    return this.listeners.filter((l) => listeners.includes(l));
  }

  subscribe(listenerFunc: Listener<T>) {
    this.listeners.push(listenerFunc);
    listenerFunc(this.values);
    return () => this.unsubscribe(listenerFunc);
  }

  unsubscribe(listenerFunc: Listener<T>) {
    this.listeners = this.listeners.filter((l) => l !== listenerFunc);
    return this;
  }
}
