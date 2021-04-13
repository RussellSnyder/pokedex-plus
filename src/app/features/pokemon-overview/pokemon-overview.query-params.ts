import { QueryParam } from 'src/isomorphic/query-param';
import { QueryParamCollection, QueryParamMap } from 'src/isomorphic/query-param-collection';
import queryParamParser from 'src/isomorphic/query-param-parser';

export enum SortQueryParam {
  Name = 'name',
  Height = 'height',
  Weight = 'weight',
}

const sortQueryParamsMap: QueryParamMap = new Map<string, QueryParam<any>>([
  [SortQueryParam.Name, new QueryParam<string>('name', queryParamParser.toModelString, queryParamParser.serializeString)],
  [SortQueryParam.Height, new QueryParam<number>('height', queryParamParser.toModelNumber, queryParamParser.serializeNumber)],
  [SortQueryParam.Weight, new QueryParam<number>('weight', queryParamParser.toModelNumber, queryParamParser.serializeNumber)],
]);

export const sortQueryParamCollection = new QueryParamCollection(sortQueryParamsMap);

export enum IntervalQueryParam {
  Offset = 'offset',
  Limit = 'limit',
}

const intervalQueryParamsMap: QueryParamMap = new Map<string, QueryParam<any>>([
  [IntervalQueryParam.Offset, new QueryParam<number>('offset', queryParamParser.toModelNumber, queryParamParser.serializeNumber)],
  [IntervalQueryParam.Limit, new QueryParam<number>('limit', queryParamParser.toModelNumber, queryParamParser.serializeNumber)],
]);

export const intervalQueryParamCollection = new QueryParamCollection(intervalQueryParamsMap);

export enum FilterQueryParam {
  Type = 'type',
  Generation = 'generation',
  HeightMin = 'heightMin',
  HeightMax = 'heightMax',
}

const filterQueryParamsMap: QueryParamMap = new Map<string, QueryParam<any>>([
  [FilterQueryParam.Type, new QueryParam<string[]>('type', queryParamParser.toModelStringList, queryParamParser.serializeStringList)],
  [FilterQueryParam.Generation,
    new QueryParam<number[]>('generation', queryParamParser.toModelNumberList, queryParamParser.serializeNumberList)],
  [FilterQueryParam.HeightMin,
    new QueryParam<number>('height-min', queryParamParser.toModelNumber, queryParamParser.serializeNumber)],
  [FilterQueryParam.HeightMax,
    new QueryParam<number>('height-max', queryParamParser.toModelNumber, queryParamParser.serializeNumber)],
]);

export const filterQueryParamCollection = new QueryParamCollection(filterQueryParamsMap);
