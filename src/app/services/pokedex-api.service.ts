import { Injectable } from '@angular/core';
// @ts-ignore-next-line
import * as PokeApiWrapper from 'pokeapi-js-wrapper';
import { GameIndex, Item, NameAndUrl, Pokemon, PokemonAbility, PokemonMove, PokemonSprite, PokemonStat, PokemonType } from '../models/pokemon.model';

export interface PokedexApiInterval {
  offset: number,
  limit: number
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
  sprites: PokemonSprite[],
  stats: PokemonStat[],
  types: PokemonType[],
  weight: number,
}

@Injectable({
  providedIn: 'root'
})
export class PokedexApiService {
  P: any;

  constructor() {
    const customOptions = {
      protocol: "https",
      hostName: "pokeapi.co",
      versionPath: "/api/v2/",
      cache: true,
      timeout: 5 * 1000, // 5s
      cacheImages: false
    }
    this.P = new PokeApiWrapper.Pokedex(customOptions)
  }

  async getPokemonByName(pokemonName: string): Promise<Pokemon> {
    const pokemonResponse: PokemonResponse = await this.P.getPokemonByName(pokemonName);
    return new Pokemon(pokemonResponse);
  }

  async getPokemonList(interval: PokedexApiInterval = { offset: 20, limit: 10 }): Promise<(Pokemon | null)[]> {
    const res = await this.P.getPokemonsList(interval);
    return await Promise.all(res.results.map((p: { name: string }) => {
      console.log(p);
      try {
        return this.getPokemonByName(p.name);        
      } catch {
        return null
      }
    }));
  }
}
