import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode, SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { PokedexTopLevelRoute, TopLevelRoutes } from 'src/app/app-routing.module';
import { LoadingState } from 'src/app/models/loading-state.enum';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokedexApiService, PokedexApiInterval, PokedexPage } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'app-pokemon-overview',
  templateUrl: './pokemon-overview.component.html',
  styleUrls: ['./pokemon-overview.component.scss']
})
export class PokemonOverviewComponent implements OnInit {
  pokedexPage?: PokedexPage;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  loadingState = LoadingState.Loading;
  LoadingState = LoadingState;

  columns: TableColumn[] = [{
    name: 'Name',
  }, {
    name: 'id'
  }]

  constructor(private api: PokedexApiService, private router: Router) { }

  ngOnInit() {
    this.loadPokemon();
  }

  setPage(pageInfo: any) {
    const { pageSize, limit, offset } = pageInfo;
    this.loadPokemon({
      offset: pageSize * offset,
      limit
    });
  }

  onSelect(event: {selected: Pokemon[]}) {
    const {name} = event.selected[0];
    console.log(name);

    this.router.navigate([PokedexTopLevelRoute.Pokemon, name]);
  }

  private async loadPokemon(interval?: PokedexApiInterval) {
    this.loadingState = LoadingState.Loading;

    try {
      this.pokedexPage = await this.api.getPokemonList(interval)

      this.loadingState = this.pokedexPage.pokemon.length > 0 ? LoadingState.DataAvailable : LoadingState.NoDataAvailable;
    } catch {
      this.loadingState = LoadingState.Error
    }
  }
}

