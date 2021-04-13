export type SerializedQueryParam = { [key: string]: string };

type QueryParamConstructorOptions<V> = {
  serializedValue?: string,
  value?: V
};

export class QueryParam<V> {
  serializedKey: string;

  toModelFunction: (value: string) => V;
  serializeValueFunction: (value: V) => string;

  value?: V;
  serializedValue = '';

  constructor(
    serializedKey: string,
    toModelFunction: (s: string) => V,
    serializeValueFunction: (v: V) => string,
    options?: QueryParamConstructorOptions<V>
  ) {
    this.serializedKey = serializedKey;
    this.toModelFunction = toModelFunction;
    this.serializeValueFunction = serializeValueFunction;

    if (!options) {
      return;
    }

    const { value, serializedValue } = options;

    if (value && serializedValue) {
      console.warn(`a value and serializedValue were passed into query param ${this.serializedKey}.
      This could cause unexpected behavior. Use either serializedValue OR value, but not both`);
    }
    if (value) {
      this.setValue(value);
    }

    if (serializedValue) {
      this.setSerializedValue(serializedValue);
    }
  }

  setSerializedValue(v: string): void {
    this.serializedValue = v;
    this.value = this.toModelFunction(v);
  }

  setValue(v: V): void {
    this.value = v;
    this.serializedValue = this.serializeValueFunction(v);
  }

  getSerializedQuery = (): SerializedQueryParam => {
    return {
      [this.serializedKey]: this.serializedValue
    };
  }
}
