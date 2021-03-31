import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { PokedexApiService } from './pokedex-api.service';

describe('PokedexApiService', () => {
  let service: PokedexApiService;
  let wrapperSpy: any;

  beforeEach(() => {
    wrapperSpy = jasmine.createSpyObj('P', ['getPokemonByName', 'getPokemonsList']);

    TestBed.configureTestingModule({
      providers: [
        PokedexApiService,
      ]
    });
    service = TestBed.inject(PokedexApiService);
    service.P = wrapperSpy
  });

  describe('getPokemonByName', () => {
    const nonExistantPokemon = 'yolo-saurus'
    const validPokemonName = 'legit snorlax'

    it('should throw if name is not a pokemon', fakeAsync(() => {
      wrapperSpy.getPokemonByName.and.returnValue('Not Found');

      service.getPokemonByName(nonExistantPokemon);

      expect(service).toThrowError;
    }));

    it('calls pokemonwrapper with given pokemon name', fakeAsync(() => {
      wrapperSpy.getPokemonByName.and.returnValue({
        name: 'whatever'
      });

      service.getPokemonByName(validPokemonName);

      expect(wrapperSpy.getPokemonByName).toHaveBeenCalledWith(validPokemonName);
    }));

  });

  describe('getPokemonList', () => {
    const pokemon1 = 'pokemon-1';
    const pokemon2 = 'pokemon-2';
    const pokemon3 = 'pokemon-3';

    it('calls wrapperSpy getNames with each name', fakeAsync(() => {
      wrapperSpy.getPokemonsList.and.returnValue({
        results: [
          { name: pokemon1 },
          { name: pokemon2 },
          { name: pokemon3 },
        ]
      });
      wrapperSpy.getPokemonByName.and.returnValue('whatevs');

      service.getPokemonList();
      tick();

      expect(wrapperSpy.getPokemonByName).toHaveBeenCalledTimes(3);
    }));

  });

});
