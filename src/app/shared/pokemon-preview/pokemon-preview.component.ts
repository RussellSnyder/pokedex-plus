import { Component, Input, OnInit } from '@angular/core';
import { IPokemon } from 'src/app/models/shared';

@Component({
  selector: 'app-pokemon-preview',
  templateUrl: './pokemon-preview.component.html',
  styleUrls: ['./pokemon-preview.component.scss']
})
export class PokemonPreviewComponent implements OnInit {
  @Input() pokemon!: IPokemon;

  constructor() { }

  ngOnInit(): void {
  }

}
