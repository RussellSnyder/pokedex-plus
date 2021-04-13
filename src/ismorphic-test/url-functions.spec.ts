import { DecodedPokemonListUrl, FilterParam, IntervalParam } from '../isomorphic/types';
import { decodePokemonListQueryParams, getKeyAndValueOfObject, getKeyWithoutPrefixAndDashes } from '../isomorphic/url-functions';


const unknownQuery = { 'prefix-unknown-query': 'whatever' };
const queryInterval = { 'i-offset': '50' };
const querySort = { 's-name-asc': '' };

const queryFilterNormal = { 'f-test-normal-filter-thingy': 'queryFilterNormal' };
const queryFilterListNumber = 'f-test-l=3,4,5';
const queryFilterListString = 'f-test-l=d,you-love,test';
const queryFilterListMixed = 'f-test-l=2,you-love,test';

xdescribe('decodePokemonListQueryParams', () => {
  describe('unknown queries', () => {

    let result: DecodedPokemonListUrl;

    beforeEach(() => {
      spyOn(console, 'warn');
      result = decodePokemonListQueryParams(unknownQuery);
    });

    it('does not return unknown queries', () => {
      expect(result).toEqual({});
    });

    it('throws a warning if unknown queries is passed', () => {
      const [key, value] = getKeyAndValueOfObject(unknownQuery);

      expect(console.warn)
        .toHaveBeenCalledWith(`unknown query ${key}: ${value}`);
    });
  });

  describe('Prefix Parsing', () => {
    describe('encoded filter query', () => {

      let result: DecodedPokemonListUrl;

      beforeEach(() => {
        result = decodePokemonListQueryParams(queryFilterNormal);
      });

      it('adds "filter" as key to result if a query has an f- prefix', () => {
        expect(result.filter).toBeTruthy();
      });

      it('returns a filter object with the key and value of a query it it has an f- prefix', () => {
        const [key, value] = getKeyAndValueOfObject(queryFilterNormal);
        const keyWithoutPrefixAndDashes = getKeyWithoutPrefixAndDashes(key);

        const filter = result.filter as FilterParam;

        expect(filter[keyWithoutPrefixAndDashes as keyof FilterParam]).toBeTruthy();
        expect(filter[keyWithoutPrefixAndDashes as keyof FilterParam]).toEqual(value);
      });
    });

    describe('encoded interval query', () => {

      let result: DecodedPokemonListUrl;

      beforeEach(() => {
        result = decodePokemonListQueryParams(queryInterval);
      });

      it('adds "interval" as key to result if a query has an i- prefix', () => {
        expect(result.interval).toBeTruthy();
      });

      // it('returns an interval object if a query has an i- prefix and is known interval', () => {
      //   const [key, value] = getKeyAndValueOfObject(queryInterval);
      //   const keyWithoutPrefixAndDashes = getKeyWithoutPrefixAndDashes(key);

      //   const interval = result.interval as IntervalParam;

      //   expect(interval[keyWithoutPrefixAndDashes as keyof IntervalParam]).toBeTruthy();
      // });

      // it('parses string to number', () => {
      //   const [key, value] = getKeyAndValueOfObject(queryInterval);
      //   const keyWithoutPrefixAndDashes = getKeyWithoutPrefixAndDashes(key);

      //   const interval = result.interval as IntervalParam;

      //   expect(interval[keyWithoutPrefixAndDashes as keyof IntervalParam]).toBe(parseInt(value, 10));
      // });
    });

    describe('encoded sort query', () => {

      let result: DecodedPokemonListUrl;

      beforeEach(() => {
        result = decodePokemonListQueryParams(querySort);
      });

      it('adds "sort" as key to result if a query has an s- prefix', () => {
        expect(result.sort).toBeTruthy();
      });

      it('decodes the endcoded sort parameter correctly', () => {
        expect(result.sort).toBeTruthy();
      });
    });
  });
});
