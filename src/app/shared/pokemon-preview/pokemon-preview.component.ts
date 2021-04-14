
import { Component, Input, OnInit } from '@angular/core';
import { IPokemon } from 'pokedex-plus-isomorphic/src/types';
import { PokemonNavigatorService } from 'src/app/services/pokemon-navigator';

@Component({
  selector: 'app-pokemon-preview',
  templateUrl: './pokemon-preview.component.html',
  styleUrls: ['./pokemon-preview.component.scss']
})
export class PokemonPreviewComponent implements OnInit {
  @Input() pokemon!: IPokemon;

  constructor(public navigator: PokemonNavigatorService) { }

  ngOnInit(): void {
  }

}
