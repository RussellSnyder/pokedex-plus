import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-sprite-gallery-image-card',
  templateUrl: './pokemon-sprite-gallery-image-card.component.html',
  styleUrls: ['./pokemon-sprite-gallery-image-card.component.scss']
})
export class PokemonSpriteGalleryImageCardComponent {
  @Input() image?: {
    key: string;
    value: string;
  };
}
