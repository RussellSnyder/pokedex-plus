import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPreviewComponent } from './pokemon-preview.component';

describe('PokemonPreviewComponent', () => {
  let component: PokemonPreviewComponent;
  let fixture: ComponentFixture<PokemonPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
