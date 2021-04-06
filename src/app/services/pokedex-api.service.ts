import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AllPokemonStats, FilterParam, IPokemon, ListInterval, PokemonListResponse } from '../models/isomorphic';

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

  async getPokemonList({ offset, limit }: ListInterval = { offset: 0, limit: 50 }, filters?: FilterParam): Promise<PokedexPage> {
    const options: AxiosRequestConfig = {
      params: { offset, limit }
    };

    if (filters) {
      options.params.filter = this._serializeFilterParams(filters);
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

  _serializeFilterParams(filters?: FilterParam): string | null {
    if (!filters) {
      return null;
    }

    const queryArray: string[] = [];

    if (filters.generations) {
      queryArray.push(`generations:[${filters.generations.join(',')}]`);
    }
    return `${queryArray.join(':')}`;
  }

  async getPokemonStats(): Promise<AllPokemonStats> {
    const res = await this.httpClient.get(`stats`);

    return res.data;

  }
}
