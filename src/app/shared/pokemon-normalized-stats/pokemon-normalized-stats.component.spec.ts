import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonNomralizedStatsComponent } from './pokemon-normalized-stats.component';

describe('PokemonStatsComponent', () => {
  let component: PokemonNomralizedStatsComponent;
  let fixture: ComponentFixture<PokemonNomralizedStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonNomralizedStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonNomralizedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
