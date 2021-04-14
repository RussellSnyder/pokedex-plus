import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingState } from 'src/app/models/loading-state.enum';
import { PokedexApiService, PokedexPage } from 'src/app/services/pokedex-api.service';
import { QueryParamService } from 'src/app/services/query-param.service';

import { QueryParamCollection } from 'pokedex-plus-isomorphic/lib/models/query-param-collection';
import { AllPokemonStats } from 'pokedex-plus-isomorphic/lib/types';

import {
  filterQueryParamCollection,
  intervalQueryParamCollection,
  sortQueryParamCollection
} from 'pokedex-plus-isomorphic/lib/query-param-collections/pokemon.query-param-collection';

@Component({
  selector: 'app-pokemon-overview',
  templateUrl: './pokemon-overview.component.html',
  styleUrls: ['./pokemon-overview.component.scss']
})
export class PokemonOverviewComponent implements OnInit {
  stats?: AllPokemonStats;
  statsLoadingState = LoadingState.Loading;

  pokedexPage?: PokedexPage;
  pokemonLoadingState = LoadingState.Loading;

  LoadingState = LoadingState;

  pageEvent?: PageEvent;

  pagination = {
    length: 100,
    pageSize: 10,
    pageSizeOptions: [5, 10, 25, 100],
    pageIndex: 0,
  };

  filterQueryParamsCollection = filterQueryParamCollection;
  sortQueryParamsCollection = sortQueryParamCollection;
  intervalQueryParamsCollection = intervalQueryParamCollection;

  constructor(
    private api: PokedexApiService,
    private queryParamService: QueryParamService,
    private activatedRoute: ActivatedRoute,
    ) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      this.updateQueryParamCollections(queryParams);

      this.loadPokemonList();
    });

    this.loadStats();
  }

  updateQueryParamCollections(serializedQueryParams?: Params): void {
    this.filterQueryParamsCollection.updateQueryParamsFromSerialized(serializedQueryParams);
    this.sortQueryParamsCollection.updateQueryParamsFromSerialized(serializedQueryParams);
    this.intervalQueryParamsCollection.updateQueryParamsFromSerialized(serializedQueryParams);
  }

  handleChangeEvent(
    queryParamCollection: QueryParamCollection,
    label: keyof typeof queryParamCollection,
    event: MatSelectChange,
  ): void {
    const { value } = event;

    if (queryParamCollection instanceof QueryParamCollection) {
      queryParamCollection.updateQueryParam(label, value);
    }

    this.updateUrl();
    this.loadPokemonList();
  }

  updateUrl(): void {
    this.queryParamService.updateUrlQueryParams({
      ...this.filterQueryParamsCollection.getSerializedQueryParams(),
      ...this.sortQueryParamsCollection.getSerializedQueryParams(),
      ...this.intervalQueryParamsCollection.getSerializedQueryParams(),
    });
  }

  // TODO consume pokemon-control endpoint
  private async loadStats(): Promise<void> {
    try {
      this.stats = await this.api.getPokemonStats();
      this.statsLoadingState = LoadingState.DataAvailable;
    } catch {
      this.pokemonLoadingState = LoadingState.Error;
    }
  }

  private async loadPokemonList(): Promise<void> {
    this.pokemonLoadingState = LoadingState.Loading;

    try {
      this.pokedexPage = await this.api.getPokemonList({
        ...this.filterQueryParamsCollection.getSerializedQueryParamsWithValues(),
        ...this.sortQueryParamsCollection.getSerializedQueryParamsWithValues(),
        ...this.intervalQueryParamsCollection.getSerializedQueryParamsWithValues(),
      });

      this.pokemonLoadingState = this.pokedexPage.pokemon.length > 0 ? LoadingState.DataAvailable : LoadingState.NoDataAvailable;
    } catch {
      this.pokemonLoadingState = LoadingState.Error;
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string): void {
    if (setPageSizeOptionsInput) {
      this.pagination.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  pagePokemonList(event: PageEvent): void {
    const {pageIndex, pageSize, length } = event;

    this.pagination = {
      ...this.pagination,
      pageIndex,
      pageSize,
    };

    // this.loadPokemon();

  }
}

