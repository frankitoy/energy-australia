import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { apiConstants } from '../constants/api.constant';

@Injectable({
  providedIn: 'root'
})
export class CarShowService {

  constructor(private httpClient: HttpClient, @Inject(apiConstants.config.carShowUrl) private carShowUrl: string) { }

  fetchCarShows(): Observable<any> {
    return this.httpClient.get(this.carShowUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            return EMPTY;
          }
          throw error;
        })
      );
  }
}
