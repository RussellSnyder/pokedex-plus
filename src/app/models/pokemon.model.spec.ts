import { PokemonResponse } from '../services/pokedex-api.service';
import { Pokemon } from './pokemon.model';

describe('Pokemon', () => {
  it('should create an instance', () => {
    expect(new Pokemon({ name: 'Foo' } as PokemonResponse)).toBeTruthy();
  });
});
