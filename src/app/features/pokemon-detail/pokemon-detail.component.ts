import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingState } from 'src/app/models/loading-state.enum';
import { Pokemon, PokemonSprite } from 'src/app/models/pokemon.model';
import { PokedexApiService } from 'src/app/services/pokedex-api.service';

type StringObject = {
  [key: string]: string
}

type VersionsObject = {
  [key: string]: { //gen
    [key: string]: { // versions
      [key: string]: StringObject
    }
  }
}

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  @Input() name?: string;
  pokemon?: Pokemon;
  images: {
    main: StringObject
    other: StringObject
    versions: VersionsObject
  } = {
    main: {},
    other: {},
    versions: {},
  };
  
  loadingState: LoadingState = LoadingState.Loading;
  LoadingState = LoadingState;


  constructor(private api: PokedexApiService, private activeRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(({ name }) => {
      this.name = name;
      this.loadPokemon(name);
    })
  }

  private async loadPokemon(name: string) {
    this.loadingState = LoadingState.Loading;
    try {
      this.pokemon = await this.api.getPokemonByName(name);

      const { main, other, versions } = this.pokemon.sprites;
      this.images = {
        main: main as StringObject,
        other: other as StringObject,
        versions: versions as VersionsObject,
      }
      
      this.loadingState = LoadingState.DataAvailable;
    } catch(e) {
      console.error(e.toString());
      console.error(e);
      this.loadingState = LoadingState.Error
    }
  }

  // private extractImages(sprites: PokemonSprite) {
  //   for (const [key, value] of Object.entries(sprites)) {
  //     if (!value) continue;

  //     if (typeof value === 'string') {
  //       this.images.push(value);
  //     } else if(typeof value === 'object') {
  //       this.extractImages(value);
  //     }
  //   }
  // }
}
