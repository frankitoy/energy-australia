import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { select } from '@angular-redux/store';

import { MatSnackBar } from '@angular/material';

import { CarShowActions } from '../../actions/car-show.actions';
import { CarShow } from '../../shared/models/car-show';

@Component({
  selector: 'ea-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  @select() readonly carShows$: Observable<CarShow>;
  @select() readonly loadingCarShow$: Observable<boolean>;
  @select() readonly notification$: Observable<string>;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private snackBar: MatSnackBar, private carShowActions: CarShowActions) { }

  ngOnInit() {
    this.notificationSubscribe();
    this.carShowActions.fetchCarShows();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  notificationSubscribe(): void {
    this.notification$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(notification => !!notification)
      )
      .subscribe((notification) =>
        this.snackBar.open(notification, 'close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: ['error']
        })
      );
  }
}
