// This file is shared between the FE and BE
export type ValueOf<T> = T[keyof T];

export interface GroupNamedAPIResourceResponse {
  data: {
    count: number;
    results: NamedAPIResource[];
  };
}

export interface ListInterval {
  offset: number;
  limit: number;
}

export interface APIResource {
  url: string;
}
export interface Description {
  description: string;
  language: string;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface GenerationGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface PokemonSprite {
  back_default?: string | null;
  back_female?: string | null;
  back_shiny?: string | null;
  back_shiny_female?: string | null;
  front_default?: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  front_shiny_female?: string | null;
}

export interface VersionPokemonSprite {
  'generation-i': {
    [key: string]: PokemonSprite;
  };
  'generation-ii': {
    [key: string]: PokemonSprite;
  };
  'generation-iii': {
    [key: string]: PokemonSprite;
  };
  'generation-iv': {
    [key: string]: PokemonSprite;
  };
  'generation-v': {
    [key: string]: PokemonSprite;
  };
  'generation-vi': {
    [key: string]: PokemonSprite;
  };
  'generation-vii': {
    [key: string]: PokemonSprite;
  };
  'generation-viii': {
    [key: string]: PokemonSprite;
  };
}

export interface OtherPokemonSprite {
  [key: string]: PokemonSprite;
}

export interface PokemonSpriteSet {
  main: PokemonSprite;
  other: OtherPokemonSprite;
  versions: VersionPokemonSprite;
}

export interface PokemonResponseType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonResponseVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface PokemonResponseMove {
  move: NamedAPIResource;
  version_group_details: PokemonResponseVersionGroupDetail[];
}

export interface PokemonResponseStat {
  base_stat: number;
  effort: number;
  stat: {
    name: keyof PokemonStats,
    url: string
  };
}

export interface PokeApiPokemonResponse {
  name: string;
  order: number;
  // pastTypes: unknown,
  abilities: PokemonAbility[];
  base_experience: number;
  forms: NamedAPIResource[];
  game_indices: GenerationGameIndex[];
  height: number;
  // heldItems: Item[];
  id: number;
  isDefault: boolean;
  locationAreaEncounters: string;
  moves: PokemonResponseMove[]; // the real response is not string, but takes up too much space!
  species: NamedAPIResource;
  sprites: PokemonSpriteSet;
  stats: PokemonResponseStat[];
  is_default: boolean;
  types: PokemonResponseType[];
  weight: number;
}

export interface PokemonJsonFormat extends Omit<PokeApiPokemonResponse, 'moves'> {
  moves: NamedAPIResource[];
}

export interface PokemonConstructorArguments extends PokemonJsonFormat {
  generation: number;
}

export interface GenerationResponse {
  id: number;
  pokemon_species: NamedAPIResource[];
  name: string;
}

export interface IPokemon {
  name: string;
  id: number;
  generation: number;

  baseExperience: number;
  normalizedBaseExperience: number;

  gamesWherePresent: string[];
  isDefault: boolean;

  forms: string[];
  types: string[];

  actions: PokemonActions;

  stats: PokemonStats;
  normalizedStats: PokemonStats;

  physicalCharacteristics: PokemonPhysicalCharacteristics;
  normalizedPhysicalCharacteristics: PokemonPhysicalCharacteristics;

  sprites: PokemonSpriteSet;
}

export interface PokemonStats {
  hp?: number;
  attack?: number;
  defense?: number;
  specialAttack?: number;
  specialDefense?: number;
  speed?: number;
}

export interface PokemonPhysicalCharacteristics {
  height: number;
  weight: number;
}

export interface PokemonActions {
  moves: string[];
  abilities: string[];
}

export interface IntervalParam {
  offset: number;
  limit: number;
}

export interface FilterParam {
  typeList?: string[];
  generationList?: number[];
  heightRange?: [number, number];
  weightRange?: [number, number];
  hpRange?: [number, number];
  attackRange?: [number, number];
  defenseRange?: [number, number];
  specialAttackRange?: [number, number];
  specialDefenseRange?: [number, number];
  speedRange?: [number, number];
  abilityList?: string[];
  moveList?: string[];
  isDefault?: boolean;
  presentInGameList?: string[];
}

export const SortParam = {
  nameAsc: 'name-asc',
  nameDesc: 'name-desc',
  heightAsc: 'height-asc',
  heightDesc: 'height-desc',
  weightAsc: 'weight-asc',
  weightDesc: 'weight-desc',
};

export interface PokemonListOptions {
  filter?: FilterParam;
  sort?: keyof typeof SortParam;
  interval?: ListInterval;
}

export interface NameAndCount {
  [key: string]: number;
}

export interface MathematicalStats {
  mean: number;
  median: number;
  mode: number;
  variance: number;
  stdev: number;
  sampleStdev: number;
  max: number;
  min: number;
}

export interface AllPokemonStat extends MathematicalStats {
  nameAndCounts: NameAndCount;
}

export interface AllPokemonStats {
  types: NameAndCount;
  abilities: NameAndCount;
  moves: NameAndCount;
  generations: number[];
  pokemonInGeneration: NameAndCount;
  pokemonPresentInGame: NameAndCount;

  height: AllPokemonStat;
  weight: AllPokemonStat;
  hp: AllPokemonStat;
  attack: AllPokemonStat;
  defense: AllPokemonStat;
  specialAttack: AllPokemonStat;
  specialDefense: AllPokemonStat;
  speed: AllPokemonStat;
  baseExperience: AllPokemonStat;

  defaultPokemonCount: number;
}

export interface PokemonListResponse {
  results: IPokemon[];
  totalResults: number;
  offset?: number;
  limit?: number;
}

export enum PokemonQueryPrefix {
  Interval = 'i',
  Filter = 'f',
  Sort = 's',
}

export const PokemonListQueryPrefixLookup = {
  i: 'interval',
  f: 'filter',
  s: 'sort',
};

export enum PokemonQuerySuffix {
  Range = 'r',
  List = 'l',
  Boolean = 'b',
}

export const PokemonListQuerySuffixLookup = {
  r: 'Range',
  l: 'List',
};

export interface DecodedPokemonListUrl {
  interval?: { [key in keyof typeof IntervalQueryKeyLookup]: number };
  filter?: FilterParam;
  sort?: keyof typeof SortParam;
}



export const SortQueryKeyLookup = {
  nameAsc: 's-name-asc',
  nameDesc: 's-name-desc',
  heightAsc: 's-height-asc',
  heightDesc: 's-height-desc',
  weightAsc: 's-weight-asc',
  weightDesc: 's-weight-desc',
};

export const IntervalQueryKeyLookup = {
  interval: 'i-interval',
  offset: 'i-offset',
};

export const FilterQueryParamLookup = {
  typeList: 'f-type-list',
  generationList: 'f-generation-list',
  heightMin: 'f-height-min',
  heightMax: 'f-height-max',
  weightMin: 'f-weight-min',
  weightMax: 'f-weight-max',
  hpMin: 'f-hp-min',
  hpMax: 'f-hp-max',
  attackMin: 'f-attack-min',
  attackMax: 'f-attack-max',
  defenseMin: 'f-defense-min',
  defenseMax: 'f-defense-max',
  specialDefenseMin: 'f-special-defense-min',
  specialDefenseMax: 'f-special-defense-max',
  specialAttackMin: 'f-special-attack-min',
  specialAttackMax: 'f-special-attack-max',
  specialSpeedMin: 'f-special-speed-min',
  specialSpeedMax: 'f-special-speed-max',
  abilityList: 'f-ability-list',
  moveList: 'f-move-list',
  isDefault: 'f-is-default',
  presentInGameList: 'f-presentInGame-list',
};
