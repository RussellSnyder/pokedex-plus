import { QueryParam } from 'src/isomorphic/query-param';
import { QueryParamCollection, QueryParamMap } from 'src/isomorphic/query-param-collection';
import queryParamParser from '../isomorphic/query-param-parser';

const mockQueryParam1 = new QueryParam<string>('serialized-label-1', queryParamParser.toModelString, queryParamParser.serializeString);
const mockQueryParam2 = new QueryParam<string>('serialized-label-2', queryParamParser.toModelString, queryParamParser.serializeString);
const mockQueryParam3Number = new QueryParam<number>('serialized-label2', queryParamParser.toModelNumber, queryParamParser.serializeNumber);

fdescribe('QueryParamCollection Class', () => {
  let mockQueryParamMap: QueryParamMap;
  beforeEach(() => {
    mockQueryParamMap = new Map<string, QueryParam<any>>([
      ['labelOne', mockQueryParam1],
      ['labelTwo', mockQueryParam2],
      ['labelThree', mockQueryParam3Number],
    ]);
  });

  describe('updateQueryParamsFromSerialized', () => {
    it('sets the value of query params if query param is found', () => {
      const mockQueryParamCollection = new QueryParamCollection(mockQueryParamMap);
      const mockSerializedQuery = {
        'serialized-label-1': 'value1',
      };

      const result = mockQueryParamCollection.updateQueryParamsFromSerialized(mockSerializedQuery);

      expect(result.get('labelOne')?.value).toBe('value1');
    });
  });
});

// describe('decodeQueryParams', () => {
//   let mockEncodedQuery: SerializedQueryParam;

//   beforeEach(() => {
//     mockEncodedQuery = {
//       's-name': 'asc',
//       'i-offset': '10',
//       'f-generation-list': '1,2,3,4',
//     };
//   });

//   it('should create QueryParam models for each encoded query parameters when they are supported', () => {
//     const result = decodeQueryParams(mockEncodedQuery);

//     expect(result).toHaveSize(3);
//     expect(result.map(q => q.getEncodedQuery())).not.toContain(undefined);
//   });

//   it('should throw error and remove unsupported encoded query', () => {
//     spyOn(console, 'error');
//     const unsupportedKey = 'hopefully-not-supported';

//     const result = decodeQueryParams({
//       ...mockEncodedQuery,
//       [unsupportedKey]: 'baz',
//     });

//     expect(result).toHaveSize(3);
//     expect(console.error).toHaveBeenCalledTimes(1);
//     expect(console.error).toHaveBeenCalledWith(`could not decode ${unsupportedKey}`);
//     expect(result.map(q => q.getEncodedQuery())).not.toContain(undefined);
//   });
// });
// describe('encodeQueryParams', () => {
//   let mockQueryParams: QueryParam<QueryParamType>[];

//   beforeEach(() => {
//     mockQueryParams = [
//       new QueryParam<string>('sort', 's-name', 'name', (v) => v),
//       new QueryParam<number>('interval', 'i-offset', 'offset', decodeNumberValue),
//       new QueryParam<string[]>('filter', 'f-type-list', 'typeList', decodeStringListValue),
//     ];
//   });

//   // Need to set values to be encoded properly
//   function setValidValuesToQueryParams(): void {
//     mockQueryParams[0].setEncodedValue('asc');
//     mockQueryParams[1].setEncodedValue('23');
//     mockQueryParams[2].setEncodedValue('1,2,3,4');
//   }

//   it('should return an object (EncodedQuery) of encoded QueryParam', () => {
//     setValidValuesToQueryParams();
//     const result = encodeQueryParams(mockQueryParams);

//     expect(Object.keys(result)).toEqual(mockQueryParams.map(q => q.encodedKey));
//   });

//   it('should return an empty object if values are not set to queries', () => {
//     const result = encodeQueryParams(mockQueryParams);

//     expect(result).toEqual({});
//   });

//   it('should call console.err for each QueryParam if values are not set to QueryParam', () => {
//     spyOn(console, 'error');

//     encodeQueryParams(mockQueryParams);

//     expect(console.error).toHaveBeenCalledTimes(3);
//   });
// });

