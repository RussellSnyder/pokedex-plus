import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSpriteGalleryComponent } from './pokemon-sprite-gallery.component';

describe('PokemonImageGalleryComponent', () => {
  let component: PokemonSpriteGalleryComponent;
  let fixture: ComponentFixture<PokemonSpriteGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonSpriteGalleryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonSpriteGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
