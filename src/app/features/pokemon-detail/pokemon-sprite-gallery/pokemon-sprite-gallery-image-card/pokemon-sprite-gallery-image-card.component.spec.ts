import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSpriteGalleryImageCardComponent } from './pokemon-sprite-gallery-image-card.component';

describe('ImageCardComponent', () => {
  let component: PokemonSpriteGalleryImageCardComponent;
  let fixture: ComponentFixture<PokemonSpriteGalleryImageCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonSpriteGalleryImageCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSpriteGalleryImageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
