import { QueryParam, SerializedQueryParam } from './query-param';

// export type QueryParamMap<T> = Map<T, QueryParam<T, any>>;
export type QueryParamMap = Map<string, QueryParam<any>>;

export class QueryParamCollection {
  private queryParams: QueryParamMap;

  constructor(
    queryParams: QueryParamMap,
  ) {
    this.queryParams = queryParams;
  }

  updateQueryParamsFromSerialized = (serializedQueryParam?: SerializedQueryParam): QueryParamMap => {
    if (!serializedQueryParam) {
      return this.queryParams;
    }

    Object.entries(serializedQueryParam)
      .forEach(([key, value]) => {
        const queryParam = this.getQueryParamsFromSerializedKey(key);
        const label = this.getLabelFromSerializedKey(key);

        if (queryParam && label) {
          queryParam.setSerializedValue(value);
          this.queryParams.set(label, queryParam);
        }
      });

    return this.queryParams;
  }

  getQueryParamByLabel = (key: string): QueryParam<any> | undefined => {
    return this.queryParams.get(key);
  }

  getLabelFromSerializedKey = (key: string): string | undefined => {
    const filteredLabels = [...this.queryParams.entries()]
    .filter(([, queryParam]) => queryParam.serializedKey === key)
    .map(([k]) => k);

    if (filteredLabels.length !== 0) {
      return filteredLabels[0];
    } else {
      console.warn(`could not find queryParam with key ${key}`)
    }

    return;
  }

  getQueryValueByLabel = (key: string): any | undefined => {
    const queryParam = this.queryParams.get(key);
    if (!queryParam) {
      return;
    }

    return queryParam.value;
  }

  getQueryParamsFromSerializedKey = (key: string): QueryParam<any> | undefined => {
    return [...this.queryParams.values()].find(q => {
      return q.serializedKey === key;
    });
  }

  getSerializedQueryParams = (): { [key: string]: string } => {
    return [...this.queryParams.values()]
      .reduce((encoded, query) => ({
        ...encoded,
        ...query.getSerializedQuery(),
      }), {});
  }

  getSerializedQueryParamsWithValues = (): { [key: string]: string } => {
    return [...this.queryParams.values()]
      .filter((v) => v.serializedValue !== '')
      .reduce((encoded, query) => ({
        ...encoded,
        ...query.getSerializedQuery(),
      }), {});
  }

  getQueryParamsWithValues = (): QueryParamMap => {
    return new Map(
      [...this.queryParams]
      .filter(([, q]) => q.serializedValue && q.serializedValue !== '')
    );
  }

  getLabelValueObject = (): {} => {
    if (!this.queryParams) {
      return {};
    }
    return [...this.queryParams]
      .reduce((prev, [label, queryParam]) => ({
        ...prev,
        [label]: queryParam.value
      }), {});
  }

  updateQueryParam = (label: string, value: any): void => {
    const queryParam = this.getQueryParamByLabel(label);

    if (!queryParam) {
      return;
    }

    queryParam.setValue(value);

    this.queryParams.set(label, queryParam);
  }
}
