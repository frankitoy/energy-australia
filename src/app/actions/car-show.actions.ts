import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NgRedux } from '@angular-redux/store';

import { finalize } from 'rxjs/operators';

import { CarShow } from '../shared/models/car-show';
import { CarShowService } from '../shared/services/car-show.service';

import { IAppState } from '../store/store';

@Injectable({
  providedIn: 'root'
})
export class CarShowActions {

  static GET_CAR_SHOW_START = 'GET_CAR_SHOW_START';
  static GET_CAR_SHOW_RESOLVE = 'GET_CAR_SHOW_RESOLVE';
  static GET_CAR_SHOW_ERROR = 'GET_CAR_SHOW_ERROR';
  static GET_CAR_SHOW_END = 'GET_CAR_SHOW_END';

  constructor(private ngRedux: NgRedux<IAppState>, private carShowService: CarShowService) {
  }

  fetchCarShows(): void {
    this.ngRedux.dispatch({type: CarShowActions.GET_CAR_SHOW_START });
    this.carShowService.fetchCarShows()
      .pipe(
        finalize(() => this.ngRedux.dispatch({ type: CarShowActions.GET_CAR_SHOW_END }))
      )
      .subscribe(
        (carShows: Array<CarShow>) => this.ngRedux.dispatch({ type: CarShowActions.GET_CAR_SHOW_RESOLVE, payload: carShows }),
        (error: HttpErrorResponse) => this.ngRedux.dispatch({ type: CarShowActions.GET_CAR_SHOW_ERROR, payload: error.error })
      );
  }
}
