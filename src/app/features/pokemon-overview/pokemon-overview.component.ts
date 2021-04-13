import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Params } from '@angular/router';
import { LoadingState } from 'src/app/models/loading-state.enum';
import { PokedexApiService, PokedexPage } from 'src/app/services/pokedex-api.service';
import { PokemonNavigatorService } from 'src/app/services/pokemon-navigator';
import { QueryParamCollection, QueryParamMap } from 'src/isomorphic/query-param-collection';
import { AllPokemonStats } from 'src/isomorphic/types';
import {
  FilterQueryParam,
  filterQueryParamCollection
} from './pokemon-overview.query-params';

type QueryParamStateObject<T> = {
  [key in keyof T]: any
};

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

  filter?: QueryParamStateObject<typeof FilterQueryParam>;
  filterQueryParamsCollection = filterQueryParamCollection;

  constructor(private api: PokedexApiService, private nav: PokemonNavigatorService) {
    // maybe there are some initial values
    this.updateQueryParamState();
  }

  ngOnInit(): void {
    this.nav.getQueryParamsFromUrl().subscribe(serializedQueryParams => {

      this.updateQueryParamState(serializedQueryParams);

      this.loadPokemon();
      this.loadStats();
    });
  }

  updateQueryParamState(serializedQueryParams?: Params): void {
    this.filterQueryParamsCollection.updateQueryParamsFromSerialized(serializedQueryParams);
    this.filter = this.filterQueryParamsCollection.getLabelValueObject() as QueryParamStateObject<typeof FilterQueryParam>;
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

    this.updateQueryParamState();
    this.updateUrl();
  }

  updateUrl(): void {
    this.nav.updateUrlQueryParams({
      ...this.filterQueryParamsCollection.getSerializedQueryParams()
    });
  }
  // private setStateFromDecodedQueryParameters(decodedQueryParams: QueryParam<QueryParamType>[]): void {
    // console.log(getGroupDecodedQueryParams<FilterQueryParamType>(decodedQueryParams, 'filter'));

    // this.filter = getGroupDecodedQueryParams<QueryParamType>(decodedQueryParams, 'filter');
    // this.sort = getGroupDecodedQueryParams<QueryParamType>(decodedQueryParams, 'sort');

    // const interval = getGroupDecodedQueryParams<QueryParamType>(decodedQueryParams, 'interval');

    // if (interval.length > 0) {
    //   this.interval = interval;
    // } else {
    //   this.setDefaultInterval();
    // }
  // }

  private async loadStats(): Promise<void> {
    try {
      this.stats = await this.api.getPokemonStats();
      this.statsLoadingState = LoadingState.DataAvailable;
    } catch {
      this.pokemonLoadingState = LoadingState.Error;
    }
  }

  private async loadPokemon(): Promise<void> {
    this.pokemonLoadingState = LoadingState.Loading;

    try {
      this.pokedexPage = await this.api.getPokemonList({
        // ...this.interval,
        ...this.filterQueryParamsCollection.getSerializedQueryParamsWithValues()
        // ...this.sort,
      });

      this.pagination = {
        ...this.pagination,
        length: this.pokedexPage.totalElements,
        pageSize: this.pokedexPage.size,
      };

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

  // updateParameter(key: string, event: MatSelectChange): void {
  //   const { value } = event;

  //   // don't set the filter state here
  //   // instead, change the url query param
  //   // the subscription in OnInit will listen
  //   // and update the filter
  //   const queryParam = getQueryParamByEncodedKey(key);

  //   if (!queryParam) {
  //     console.error('could not find queryParam with encoded key', key);
  //     return;
  //   }

  //   queryParam.setDecodedValue(value);

  //   this.nav.updateUrlQueryParam(queryParam);
  // }

  pagePokemonList(event: PageEvent): void {
    const {pageIndex, pageSize, length } = event;

    this.pagination = {
      ...this.pagination,
      pageIndex,
      pageSize,
    };

    // this.loadPokemon();

  }

  // private setDefaultInterval(): void {
  //   const offset = getQueryParamByEncodedKey('i-offset') as QueryParam<QueryParamType>;
  //   offset.setDecodedValue(0);

  //   const limit = getQueryParamByEncodedKey('i-limit') as QueryParam<QueryParamType>;
  //   limit.setDecodedValue(10);

  //   this.interval = [offset, limit];
  // }
}

