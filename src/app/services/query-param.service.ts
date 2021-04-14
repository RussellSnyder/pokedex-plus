import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class QueryParamService {
  currentQueryParams: Params = {};

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  updateUrlQueryParams(serializedQueryParams: Params): void {
    Object.entries(serializedQueryParams)
      .forEach(([key, value]) => {
        const isQueryCurrentlyActive = this.currentQueryParams[key];

        if (isQueryCurrentlyActive && value === '') {
          delete this.currentQueryParams[key];
        } else if (value !== '') {
          this.currentQueryParams[key] = value;
        }
      });

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: this.currentQueryParams,
      replaceUrl: true,
    });
  }
}
