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

  physicalCharacteristics: PokemonPhysicalCharactersitics;
  normalizedPhysicalCharacteristics: PokemonPhysicalCharactersitics;

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

export interface PokemonPhysicalCharactersitics {
  height: number;
  weight: number;
}

export interface PokemonActions {
  moves: string[];
  abilities: string[];
}

export interface FilterParam {
  type?: string;
  generations?: number[];
  height?: [number, number];
  weight?: [number, number];
  hp?: [number, number];
  attack?: [number, number];
  defense?: [number, number];
  specialAttack?: [number, number];
  specialDefense?: [number, number];
  speed?: [number, number];
  ability?: string;
  move?: string;
  isDefault?: boolean;
  presentInGame?: string;
}

export enum SortParam {
  NameAsc = 'name-asc',
  NameDesc = 'name-desc',
  HeightAsc = 'height-asc',
  HeightDesc = 'height-desc',
  WeightAsc = 'weight-asc',
  WeightDesc = 'weight-desc',
}

export interface PokemonListOptions {
  filter?: FilterParam;
  sort?: SortParam;
  limit?: number;
  offset?: number;
}

export interface NameAndCount {
  [key: string]: number;
}

export interface MathmaticalStats {
  mean: number;
  median: number;
  mode: number;
  variance: number;
  stdev: number;
  sampleStdev: number;
  max: number;
  min: number;
}

export interface AllPokemonStat extends MathmaticalStats {
  nameAndCounts: NameAndCount;
}

export interface AllPokemonStats {
  types: NameAndCount;
  abilities: NameAndCount;
  moves: NameAndCount;
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
