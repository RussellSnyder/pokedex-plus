import { Component, Input } from '@angular/core';
import { PokemonSpriteSet } from 'pokedex-plus-isomorphic/src/types';

@Component({
  selector: 'app-pokemon-sprite-gallery',
  templateUrl: './pokemon-sprite-gallery.component.html',
  styleUrls: ['./pokemon-sprite-gallery.component.scss']
})
export class PokemonSpriteGalleryComponent {
  @Input() spriteSet?: PokemonSpriteSet;
}
