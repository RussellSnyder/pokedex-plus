import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PokedexTopLevelRoute, PokemonSubRoutes } from '../models/routes';

@Injectable({
  providedIn: 'root'
})
export class PokemonNavigatorService {
  currentQueryParams: Params = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) { }

  goToPokemonDetailPage(pokemonName: string): void {
    this.router.navigate([PokedexTopLevelRoute.Pokemon, pokemonName]);
  }

  getPokemonDetailParamFromUrl(): string | null {
    return this.activatedRoute.snapshot.paramMap.get(PokemonSubRoutes.DetailParam);
  }

  getQueryParamsFromUrl(): Observable<Params> {
    return new Observable(subscriber => {
      this.activatedRoute.queryParams.subscribe((queryParams) => {
        subscriber.next(queryParams);
        subscriber.complete();
      });
    });
  }

  updateUrlQueryParams(serializedQueryParams: Params): void {
    Object.entries(serializedQueryParams)
      .forEach(([key, value]) => {
        const isQueryCurrentlyActive = this.currentQueryParams[key];

        if (isQueryCurrentlyActive && value === '') {
          delete this.currentQueryParams[key];
        } else if (value !== '') {
          this.currentQueryParams[key] = value;
        }
      });

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.currentQueryParams,
      replaceUrl: true,
    });
  }
}
