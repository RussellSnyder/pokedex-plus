import { PokemonResponse } from "../services/pokedex-api.service"

export interface NameAndUrl {
  name: string,
  url: string,
}

export interface PokemonAbility {
  ability: NameAndUrl;
  is_hidden: boolean,
  slot: number,
}

export interface GameIndex {
  game_index: number,
  version: NameAndUrl
}

export interface ItemVersionDetail {
  rarity: number,
  version: NameAndUrl,
}

export interface Item {
  item: NameAndUrl,
  version_details: ItemVersionDetail[]
}

export interface VersionGroupDetail {
  level_learned_at: number,
  move_learn_method: NameAndUrl,
  version_group: NameAndUrl,
}
export interface PokemonMove {
  move: NameAndUrl,
  version_group_details: VersionGroupDetail[],
}

export interface PokemonSpriteTypes {
  back_default?: string,
  back_female?: string,
  back_shiny?: string,
  back_shiny_female?: string,
  front_default?: string,
  front_female?: string,
  front_shiny?: string,
  front_shiny_female?: string,
}

export interface PokemonSprite extends PokemonSpriteTypes {
  versions: {
    [key: string]: PokemonSpriteTypes
  }
}

export interface PokemonStat {
  base_stat: number,
  effort: number,
  stat: NameAndUrl
}

export interface PokemonType {
  slot: number,
  type: NameAndUrl
}

export interface IPokemon {
  name: string,
  order: number,
  pastTypes: [], // Need to find a pokemon with a past type....
  abilities: PokemonAbility[],
  baseExperience: number,
  forms: NameAndUrl[],
  gameIndices: GameIndex[],
  height: number,
  heldItems: Item[],
  id: number,
  isDefault: boolean,
  locationAreaEncounters: string,
  moves: PokemonMove[],
  species: NameAndUrl[],
  sprites: PokemonSprite[],
  stats: PokemonStat[],
  types: PokemonType[],
  weight: number,
}


export class Pokemon implements IPokemon { 
  name: string;
  order: number;
  pastTypes;
  abilities: PokemonAbility[];
  baseExperience: number;
  forms: NameAndUrl[];
  gameIndices: GameIndex[];
  height: number;
  heldItems: Item[];
  id: number;
  isDefault: boolean;
  locationAreaEncounters: string;
  moves: PokemonMove[];
  species: NameAndUrl[];
  sprites: PokemonSprite[];
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;

  constructor(initialState: PokemonResponse) {
    this.name = initialState.name;
    this.order = initialState.order;
    this.pastTypes = initialState.past_types;
    this.abilities = initialState.abilities;
    this.baseExperience = initialState.base_experience;
    this.forms = initialState.forms;
    this.gameIndices = initialState.game_indices;
    this.height = initialState.height;
    this.heldItems = initialState.held_items;
    this.id = initialState.id;
    this.isDefault = initialState.is_default;
    this.locationAreaEncounters = initialState.location_area_encounters;
    this.moves = initialState.moves;
    this.species = initialState.species;
    this.sprites = initialState.sprites;
    this.stats = initialState.stats;
    this.types = initialState.types;
    this.weight = initialState.weight;
  }
}
