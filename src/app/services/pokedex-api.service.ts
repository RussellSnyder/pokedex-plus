import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { QueryParam } from 'pokedex-plus-isomorphic/lib/models/query-param';
import { AllPokemonStats, IPokemon, PokemonListResponse } from 'pokedex-plus-isomorphic/lib/types';
import { environment } from '../../environments/environment';

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

export enum PokedexApiError {
  NoPokemonWithName
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

  async getPokemonList(queryParams: {}): Promise<PokedexPage> {
    const options: AxiosRequestConfig = {
      params: queryParams
    };


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

  async getPokemonStats(): Promise<AllPokemonStats> {
    const res = await this.httpClient.get(`stats`);

    return res.data;
  }
}
function encodeQueryParams(queryParams: QueryParam<any>[]): any {
  throw new Error('Function not implemented.');
}

