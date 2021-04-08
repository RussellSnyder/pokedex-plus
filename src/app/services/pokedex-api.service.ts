import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AllPokemonStats, DecodedPokemonListUrl, FilterParam, IPokemon, ListInterval, PokemonListResponse } from '../../isomorphic/types';
import { encodePokemonListFilterQueryParam } from 'src/isomorphic/url-functions';

export interface QueryListInterval {
  offset: number;
  limit: number;
}

export interface PokedexPage {
  size: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pokemon: IPokemon[];
}

@Injectable({
  providedIn: 'root'
})
export class PokedexApiService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: environment.apiEndpoint,
    });
  }

  async getPokemonByName(pokemonName: string): Promise<IPokemon> {
    const res = await this.httpClient.get(`pokemon/${pokemonName}`);
    return res.data;
  }

  async getPokemonList(queries: DecodedPokemonListUrl): Promise<PokedexPage> {
    const { interval, filter, sort } = queries;

    const options: AxiosRequestConfig = {
      params: {}
    };

    if (interval) {
      Object.entries(interval).forEach(([key, value]) => {
        options.params[`i-${key}`] = value.toString();
      });
    }

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {

        const filterParamKey = key as keyof FilterParam;
        const encoded = encodePokemonListFilterQueryParam(filterParamKey, value);

        if (encoded && encoded[1]) {
          options.params[encoded[0]] = encoded[1];
        }
      });
    }

    const res = await this.httpClient.get(`pokemon`, options);

    if (!res.data) {
      throw Error('could not get pokemon list');
    }

    const { totalResults, results, offset: resOffest, limit: resLimit }: PokemonListResponse = res.data;

    const totalPages = resLimit ? Math.ceil(totalResults / resLimit) : 0;
    const currentPageNumber = (resOffest && resLimit) ? Math.ceil(resOffest / resLimit) : 1;

    return {
      pageNumber: currentPageNumber,
      totalPages,
      size: resLimit ?? 0,
      totalElements: totalResults,
      pokemon: results
    };
  }

  _serializeFilter(filters?: FilterParam): string | null {
    if (!filters) {
      return null;
    }

    console.log({filters});

    const queryArray: string[] = [];

    if (filters.generationList) {
      queryArray.push(`generations:[${filters.generationList.join(',')}]`);
    }
    return `${queryArray.join(':')}`;
  }

  async getPokemonStats(): Promise<AllPokemonStats> {
    const res = await this.httpClient.get(`stats`);

    return res.data;
  }
}
