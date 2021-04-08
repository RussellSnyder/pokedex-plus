import { Component, Input, OnInit } from '@angular/core';
import { PokemonSprite, PokemonSpriteSet } from 'src/isomorphic/types';

/* tslint:disable */
@Component({
  selector: 'app-pokemon-sprite-gallery',
  templateUrl: './pokemon-sprite-gallery.component.html',
  styleUrls: ['./pokemon-sprite-gallery.component.scss']
})
export class PokemonSpriteGalleryComponent {
  @Input() spriteSet?: PokemonSpriteSet;
}
