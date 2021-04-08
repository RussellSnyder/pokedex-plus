import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { AllPokemonStats, FilterParam, ListInterval, SortParam } from 'src/isomorphic/types';
import { LoadingState } from 'src/app/models/loading-state.enum';
import { PokedexApiService, PokedexPage } from 'src/app/services/pokedex-api.service';
import { PokemonNavigatorService } from 'src/app/services/pokemon-navigator';
import { FormControl, FormGroup } from '@angular/forms';

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

  filter?: FilterParam = {
    generationList: []
  };

  interval?: ListInterval;
  sort?: SortParam;

  constructor(private api: PokedexApiService, private nav: PokemonNavigatorService) { }

  ngOnInit(): void {
    this.nav.getPokemonListQueriesFromUrl().subscribe(decodedQueryParams => {
      console.log({ decodedQueryParams });

      const { interval, filter, sort } = decodedQueryParams;

      this.filter = {
        ...this.filter,
        ...filter,
      };

      this.interval = interval;
      this.sort = sort;

      this.loadPokemon();
      this.loadStats();
    });
  }

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
        interval: {
          offset: this.pagination.pageSize * this.pagination.pageIndex,
          limit: this.pagination.pageSize,
        },
        filter: this.filter,
        sort: this.sort
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

  updateFilter(event: MatSelectChange): void {
    const { value, source } = event;
    const { id } = source;

    const decodedFilterName = id as keyof FilterParam;
    // console.log({ filterName: encodedFilterName });

    this.filter = {
      ...this.filter,
      [decodedFilterName]: value
    };

    this.updateUrl();
    this.loadPokemon();
  }

  updateUrl(): void {
    this.nav.encodePokemonListQueriesToUrl({
      filter: this.filter,
      sort: this.sort,
      interval: this.interval,
    });
  }

  pagePokemonList(event: PageEvent): void {
    const {pageIndex, pageSize, length } = event;

    this.pagination = {
      ...this.pagination,
      pageIndex,
      pageSize,
    };

    this.loadPokemon();

  }

  compareGenerationFilter(generation: string, values: any): boolean {
    console.log(generation, values, this.filter);
    const selected = this.filter?.generationList;
    // console.log('filter:', this.filter);
    // console.log({ generation, values });
    if (!selected) {
      return false;
    }

    return selected.includes(parseInt(generation, 10));
    // return object1 && object2 && object1.id === object2.id;
  }
}

