import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DecodedPokemonListUrl, FilterParam } from '../../isomorphic/types';
import { decodePokemonListQueryParams, encodePokemonListFilterQueryParam, encodePokemonListIntervalQueryParam } from '../../isomorphic/url-functions';
import { PokedexTopLevelRoute, PokemonSubRoutes } from '../models/routes';

@Injectable({
  providedIn: 'root'
})
export class PokemonNavigatorService {
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private location: Location) { }

  goToPokemonDetailPage(pokemonName: string): void {
    this.router.navigate([PokedexTopLevelRoute.Pokemon, pokemonName]);
  }

  getPokemonDetailParamFromUrl(): string | null {
    return this.activatedRoute.snapshot.paramMap.get(PokemonSubRoutes.DetailParam);
  }

  getPokemonListQueriesFromUrl(): Observable<DecodedPokemonListUrl> {
    return new Observable(subscriber => {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        subscriber.next(decodePokemonListQueryParams(queryParams));
        subscriber.complete();
      });
    });
  }

  encodePokemonListQueriesToUrl(queries: DecodedPokemonListUrl): void {
    const encodedQueryParams: Params = {};

    if (queries.filter) {
      Object.entries(queries.filter).forEach(([key, value]) => {
        if (!value) {
          return;
        }
        const filterParamKey = key as keyof FilterParam;
        const encoded = encodePokemonListFilterQueryParam(filterParamKey, value);
        if (encoded) {
          encodedQueryParams[encoded[0]] = encoded[1];
        }
      });
    }

    if (queries.interval) {
      Object.entries(queries.interval).forEach(([key, value]) => {
        encodedQueryParams[key] = value.join(',');
      });
    }

    console.log({ encodedQueryParams });

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: encodedQueryParams,
      replaceUrl: true,
    });
  }
}
