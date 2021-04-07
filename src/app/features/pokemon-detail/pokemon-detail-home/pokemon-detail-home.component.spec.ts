import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailHomeComponent } from './pokemon-detail-home.component';

describe('PokemonDetailHomeComponent', () => {
  let component: PokemonDetailHomeComponent;
  let fixture: ComponentFixture<PokemonDetailHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonDetailHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
