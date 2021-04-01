import { Location } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PokedexTopLevelRoute, TopLevelRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { PokemonDetailComponent } from './features/pokemon-detail/pokemon-detail.component';
import { PokemonOverviewComponent } from './features/pokemon-overview/pokemon-overview.component';

describe('AppComponent', () => {

  let location: Location;
  let router: Router;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(TopLevelRoutes),
      ],
      declarations: [
        AppComponent, PokemonOverviewComponent, PokemonDetailComponent, NotFoundComponent
      ],
    });

    router = TestBed.inject(Router); 
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('top level routing', () => {

    it('should redirect to PokemonOverivew if "" is given', fakeAsync(() => {
      router.navigate([""]);
      tick();
      expect(location.path()).toBe(`/${PokedexTopLevelRoute.Pokemon}`);
    }));

    it('should redirect to NotFound if "asdfasdf" is given', fakeAsync(() => {
      router.navigate(["asdfasdf"]);
      tick();
      expect(location.path()).toBe(`/${PokedexTopLevelRoute.NotFound}`);
    }));

    it('should navigate to pokemon detail component if "pokemon/:id" is given', fakeAsync(() => {
      router.navigate(['pokemon/lala']);
      tick();
      expect(location.path()).toBe(`/${PokedexTopLevelRoute.Pokemon}/lala`);
    }));

  })
});
