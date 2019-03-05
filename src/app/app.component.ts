import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { filter } from 'rxjs/operators';

import { RoutePartsService } from './shared/services/route-parts.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'ea-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  public appTitle = environment.appName;
  public pageTitle;

  constructor(public title: Title, private router: Router, private activeRoute: ActivatedRoute, private routePartsService: RoutePartsService) {
  }

  ngOnInit() {
    this._changePageTitle();
  }

  private _changePageTitle(): void {
    this.router.events.
      pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        const routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
        if (!routeParts.length) {
          return this.title.setTitle(this.appTitle);
        }

        this.pageTitle = routeParts
          .reverse()
          .map((part) => part.title )
          .reduce((partA, partI) => `${partA} > ${partI}`);

        this.pageTitle += ` | ${this.appTitle}`;
        this.title.setTitle(this.pageTitle);
      });
  }
}
