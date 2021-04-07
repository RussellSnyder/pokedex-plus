import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokedexTopLevelRoute, PokemonSubRoutes } from '../models/routes';

@Injectable({
  providedIn: 'root'
})
export class PokemonNavigatorService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  goToPokemonDetailPage(pokemonName: string): void {
    this.router.navigate([PokedexTopLevelRoute.Pokemon, pokemonName]);
  }

  getPokemonDetailParamFromUrl(): string | null {
    return this.activatedRoute.snapshot.paramMap.get(PokemonSubRoutes.DetailParam);
  }
}

