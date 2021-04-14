import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPokemon } from 'pokedex-plus-isomorphic/lib/types';
import { LoadingState } from 'src/app/models/loading-state.enum';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  @Input() name?: string;
  pokemon?: IPokemon;

  loadingState: LoadingState = LoadingState.Loading;
  LoadingState = LoadingState;


  constructor(private api: PokedexApiService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({ name }) => {
      this.name = name;
      this.loadPokemon(name);
    });
  }

  private async loadPokemon(name: string): Promise<void> {
    this.loadingState = LoadingState.Loading;
    try {
      this.pokemon = await this.api.getPokemonByName(name);

      if (!this.pokemon) {
        return;
      }

      this.loadingState = LoadingState.DataAvailable;

    } catch (e) {
      console.error(e.toString());
      console.error(e);
      this.loadingState = LoadingState.Error;
    }
  }
}
