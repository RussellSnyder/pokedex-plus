import { Injectable } from '@angular/core';
// @ts-ignore-next-line
import * as PokeApiWrapper from 'pokeapi-js-wrapper';
import { environment } from '../../environments/environment';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import { GameIndex, Item, NameAndUrl, Pokemon, PokemonAbility, PokemonMove, PokemonSprite, PokemonSpriteSet, PokemonStat, PokemonType } from '../models/pokemon.model';
import { AllPokemonStats, FilterParam, IPokemon, ListInterval, PokemonListResponse } from '../models/shared';

export interface QueryListInterval {
  offset: number,
  limit: number
}

export interface PokedexPage {
  size: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  pokemon: IPokemon[]
}

// TODO create a types package on npm :-)
export interface PokemonResponse {
  name: string,
  order: number,
  past_types: [], // Need to find a pokemon with a past type....
  abilities: PokemonAbility[],
  base_experience: number,
  forms: NameAndUrl[],
  game_indices: GameIndex[],
  height: number,
  held_items: Item[],
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: PokemonMove[],
  species: NameAndUrl[],
  sprites: PokemonSpriteSet,
  stats: PokemonStat[],
  types: PokemonType[],
  weight: number,
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

  async getPokemonByName(pokemonName: string): Promise<Pokemon> {
    const pokemonResponse: PokemonResponse = await this.httpClient.get(`pokemon/${pokemonName}`);
    return new Pokemon(pokemonResponse);
  }

  async getPokemonList({ offset, limit }: ListInterval = { offset: 0, limit: 50 }, filters?: FilterParam): Promise<PokedexPage> {
    const options: AxiosRequestConfig = {
      params: { offset, limit }
    }

    if (filters) {
      options.params.filter = this._serializeFilterParams(filters);
    }

    const res = await this.httpClient.get(`pokemon`, options)

    const { totalResults, results, offset: resOffest, limit: resLimit }: PokemonListResponse = res.data;

    const totalPages = Math.ceil(totalResults / resLimit!);
    const currentPageNumber = Math.ceil(resOffest! / resLimit!)

    return {
      pageNumber: currentPageNumber,
      totalPages,
      size: resLimit!,
      totalElements: totalResults,
      pokemon: results
    }
  }

  _serializeFilterParams(filters?: FilterParam): string | null {
    if (!filters) {
      return null
    }
    let queryArray: string[] = []    

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
