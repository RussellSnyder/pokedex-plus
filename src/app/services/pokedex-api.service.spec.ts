import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PokedexApiService } from './pokedex-api.service';

describe('PokedexApiService', () => {
  let service: PokedexApiService;
  let httpSpy: any;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('httpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        PokedexApiService,
      ]
    });

    service = TestBed.inject(PokedexApiService);
    service.httpClient = httpSpy;

  });

  describe('getPokemonByName', () => {
    const pokemonName = 'snorlax';

    it('calls httpClient with given pokemon name', fakeAsync(() => {
      httpSpy.get.and.returnValue({
        name: 'whatever'
      });

      service.getPokemonByName(pokemonName);

      expect(httpSpy.get).toHaveBeenCalledWith(`pokemon/${pokemonName}`);
    }));

  });

  describe('getPokemonList', () => {

    it('calls httpCllient with "pokemon" as endpoint', fakeAsync(() => {
      httpSpy.get.and.returnValue({
        data: {}
      });

      service.getPokemonList([]);
      tick();

      expect(httpSpy.get).toHaveBeenCalledTimes(1);
    }));

  });

});
