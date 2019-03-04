import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { select } from '@angular-redux/store';

import { MatSnackBar } from '@angular/material';

import { Messages } from '../../shared/constants/messages.constant';
import { CarShow } from '../../shared/models/car-show';

import { CarShowActions } from '../../actions/car-show.actions';

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
    this._carShowSubscribe();
    this._notificationSubscribe();
    this.carShowActions.fetchCarShows();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private _carShowSubscribe(): void {
    this.carShows$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        tap(carShows => {
          if (typeof carShows !== 'undefined' && !carShows) {
            this._openSnackBar(Messages.warning.emptyResult);
          }
        }),
        filter(carShows => !!carShows)
      )
      .subscribe((carShows) => {
        console.log(carShows);
      });
  }

  private _notificationSubscribe(): void {
    this.notification$
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(notification => !!notification)
      )
      .subscribe((notification) => this._openSnackBar(notification));
  }

  private _openSnackBar(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: ['error']
    });
  }
}
