import { Component, Input } from '@angular/core';
import { IPokemon } from 'src/app/models/isomorphic';

@Component({
  selector: 'app-pokemon-detail-home',
  templateUrl: './pokemon-detail-home.component.html',
  styleUrls: ['./pokemon-detail-home.component.scss']
})
export class PokemonDetailHomeComponent {
  @Input() pokemon?: IPokemon;
}
