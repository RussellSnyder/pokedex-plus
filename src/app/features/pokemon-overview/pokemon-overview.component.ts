import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { LoadingState } from 'src/app/models/loading-state.enum';
import { AllPokemonStats, FilterParam } from 'src/app/models/shared';
import { PokedexApiService, PokedexPage } from 'src/app/services/pokedex-api.service';

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

  filters: FilterParam = {};

  constructor(private api: PokedexApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadPokemon();
    this.loadStats();
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
        offset: this.pagination.pageSize * this.pagination.pageIndex,
        limit: this.pagination.pageSize,
      }, this.filters);

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

  updateGenFilter(event: MatSelectChange): void {
    const { value } = event;

    this.filters.generations = value;

    this.loadPokemon();
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
}

