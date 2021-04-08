import {
  DecodedPokemonListUrl,
  FilterParam,
  PokemonQueryPrefix,
  PokemonListQueryPrefixLookup,
  ValueOf,
  PokemonListQuerySuffixLookup,
  PokemonQuerySuffix,
  ListInterval
} from './types';

export function decodePokemonListQueryParams(queryParams: { [key: string]: string }): DecodedPokemonListUrl {
  const returnObject: any = {};

  const prefixesPossible = Object.keys(PokemonListQueryPrefixLookup);
  const suffixesPossible = Object.keys(PokemonListQuerySuffixLookup);

  Object.entries(queryParams).forEach(([key, value]) => {
    const [prefix, ...rest] = key.split('-');

    if (prefixesPossible.includes(prefix)) {
      const typedPrefix = prefix as keyof typeof PokemonListQueryPrefixLookup;
      const realKey = PokemonListQueryPrefixLookup[typedPrefix] as keyof DecodedPokemonListUrl;

      let queryKey = rest;

      const maybeSuffix = rest[rest.length - 1];
      if (suffixesPossible.includes(maybeSuffix)) {
        const typedSuffix = maybeSuffix as keyof typeof PokemonListQuerySuffixLookup;
        const realSuffix = PokemonListQuerySuffixLookup[typedSuffix];

        queryKey = [...rest.slice(0, rest.length - 1), realSuffix];
      }

      if (!returnObject[realKey]) {
        returnObject[realKey] = {
          [queryKey.join('')]: _parseValue(key, value)
        };
      } else {
        returnObject[realKey][queryKey.join('')] = _parseValue(key, value);
      }
    }
  });

  return returnObject as DecodedPokemonListUrl;
}

export function _parseValue(key: string, value: string): (number | string)[] | string | number | boolean {
  if (isIntervalQuery(key)) {
    return parseInt(value, 10);
  }

  if (isBooleanQuery(key)) {
    return parseStringBool(value);
  }

  if (isListQuery(key)) {
    const valueArray = value.split(',');

    const isNumberArray = !valueArray.some(val => isNaN(parseInt(val, 10)));

    if (isNumberArray) {
      return valueArray.map(v => parseInt(v, 10));
    }
    return valueArray;
  }

  if (isRangeQuery(key)) {
    const valueArray = value.split(',').filter(Boolean);

    if (valueArray.length === 2) {
      return valueArray
        .map(v => parseInt(v, 10));
    }

    const commaIndex = value.split('').findIndex(v => v === ',');

    if (commaIndex === 0) {
      return [-Infinity, parseInt(valueArray[0], 10)];
    } else {
      return [parseInt(valueArray[0], 10), Infinity];
    }
  }

  return value;
}

export function isFilterQuery(key: string): boolean {
  return key.substr(0, 2) === `${PokemonQueryPrefix.Filter}-`;
}

export function isSortQuery(key: string): boolean {
  return key.substr(0, 2) === `${PokemonQueryPrefix.Sort}-`;
}

export function isIntervalQuery(key: string): boolean {
  return key.substr(0, 2) === `${PokemonQueryPrefix.Interval}-`;
}

export function isListQuery(key: string): boolean {
  return key.substr(key.length - 2, key.length) === `-${PokemonQuerySuffix.List}`;
}

export function isDecodedListQuery(key: keyof FilterParam): boolean {
  return key.substr(key.length - PokemonListQuerySuffixLookup.l.length, key.length) === `${PokemonListQuerySuffixLookup.l}`;
}

export function isBooleanQuery(key: string): boolean {
  return key.substr(key.length - 2, key.length) === `-${PokemonQuerySuffix.Boolean}`;
}

export function isRangeQuery(key: string): boolean {
  return key.substr(key.length - 2, key.length) === `-${PokemonQuerySuffix.Range}`;
}

export function isDecodedRangeQuery(key: keyof FilterParam): boolean {
  return key.substr(key.length - PokemonListQuerySuffixLookup.r.length, key.length) === `${PokemonListQuerySuffixLookup.r}`;
}

export function encodePokemonListFilterQueryParam(key: keyof FilterParam, value: ValueOf<FilterParam>): [string, string] | undefined {
  if (!value) {
    return;
  }

  if (isDecodedListQuery(key)) {
    const encodedFilterName = key.substr(0, key.length - PokemonListQuerySuffixLookup.l.length);
    return [`f-${encodedFilterName}-${PokemonQuerySuffix.List}`, (value as any[]).join(',')];
  }

  if (isRangeQuery(key)) {
    // TODO check if min and max or just one
    return [key, (value as any[]).join(',')];
  }

  return [`${key}`, value.toString()];
}

export function encodePokemonListIntervalQueryParam(key: string, value: ValueOf<ListInterval>): [string, string] | undefined {
  if (!value) {
    return;
  }

  return [`i-${key}`, value.toString()];
}

const parseStringBool = (value: string): boolean => {
  let bool;
  const maybeNumber = parseInt(value, 10);
  if (isNaN(maybeNumber)) {
    bool = value === 'true' ? true : false;
  } else {
    bool = maybeNumber === 0 ? false : true;
  }

  return bool;
};

