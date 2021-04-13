import { QueryParam } from 'src/isomorphic/query-param';
import queryParamParser from '../isomorphic/query-param-parser';


const mockDecodedKey = 'expectedDecodedKey';
const mockEncodedKey = 'encoded-key-from-server';

const mockEncodedNumberValue = '1234';
const mockDecodedNumberValue = 1234;
const mockEncodedNumberListValue = '1,2,3,4';
const mockDecodedNumberListValue = [1, 2, 3, 4];
const mockEncodedStringListValue = 'a,b,c,d';
const mockDecodedStringListValue = ['a', 'b', 'c', 'd'];
const mockEncodedStringValue = 'foo bar-baz';
const mockDecodedStringValue = 'foo bar-baz';
const mockEncodedBooleanValueIntTrue = '1';
const mockEncodedBooleanValueIntFalse = '0';
const mockEncodedBooleanValueStringTrue = 'true';
const mockEncodedBooleanValueStringFalse = 'false';

describe('QueryParamCollection Class', () => {
  it('should call setValue when a serialized value is set in constructor', () => {
    const mockParam = new QueryParam<string>('sort', queryParamParser.toModelString, queryParamParser.serializeString, {
      serializedValue: mockEncodedStringValue
     });

    spyOn(mockParam, 'setValue');

    expect(mockParam.setValue).toHaveBeenCalledWith(mockEncodedStringValue);
  });

  it('should call serializeValue when a value is set in constructor', () => {
    const mockParam = new QueryParam<string>('sort', queryParamParser.toModelString, queryParamParser.serializeString, {
      value: mockDecodedStringValue
     });

    spyOn(mockParam, 'setSerializedValue');

    expect(mockParam.setValue).toHaveBeenCalledWith(mockDecodedStringValue);
  });

  it('getEncodedQuery should return encoded object if serialized value is set', () => {
    const serializedValue = 'what is up?';

    const mockParam = new QueryParam<string>('sort', queryParamParser.toModelString, queryParamParser.serializeString, {
      serializedValue
    });

    expect(mockParam.getSerializedQuery()).toEqual({ sort: serializedValue });
  });

  it('getEncodedQuery should return encoded object if value is set', () => {
    const value = 'what is up?';

    const mockParam = new QueryParam<string>('sort', queryParamParser.toModelString, queryParamParser.serializeString, {
      serializedValue: value
    });

    expect(mockParam.getSerializedQuery()).toEqual({ sort: value });
  });

  it('getEncodedQuery should call console.error and return undefined if value is not set', () => {
    const mockParam = new QueryParam<string>('sort', queryParamParser.toModelString, queryParamParser.serializeString);
    spyOn(console, 'error');

    const result = mockParam.getSerializedQuery();

    expect(result).toBeUndefined();
    expect(console.error).toHaveBeenCalled();
  });
});

