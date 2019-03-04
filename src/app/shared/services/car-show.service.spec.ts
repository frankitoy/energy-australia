import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { discardPeriodicTasks, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EMPTY, throwError } from 'rxjs';

import { carShowFixtures } from '../../../test/fixtures/car-show-fixtures';

import { apiConstants } from '../constants/api.constant';

import { CarShow } from '../models/car-show';

import { CarShowService } from './car-show.service';

describe('CarShowService', () => {

  const apiUrl = 'http://api.mock.com';
  const carShowFixture = carShowFixtures();

  let carShowService: CarShowService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CarShowService,
        {
          provide: apiConstants.config.carShowUrl,
          useValue: apiUrl
        },
      ]
    });
  });

  afterEach(() => httpMock.verify());

  beforeEach(inject([CarShowService, HttpTestingController], (service: CarShowService, httpTestingController: HttpTestingController) => {
    carShowService = service;
    httpMock = httpTestingController;
  }));

  it('should be created', () => {
    carShowService = TestBed.get(CarShowService);
    expect(carShowService).toBeTruthy();
  });

  describe('fetchCarShows()', () => {

    it('should make HTTP GET car shows request with relevant request data', () => {
      // Given

      // When
      carShowService.fetchCarShows()
        .subscribe((response: Array<CarShow>) => expect(response).toEqual(carShowFixture));

      const req = httpMock.expectOne(apiUrl);
      req.flush(carShowFixture);

      // Then
      expect(req.request.urlWithParams).toBe(apiUrl);
      expect(req.request.method).toBe('GET');
      expect(req.request.headers.keys().length).toEqual(0);
    });

    describe('when api response call has errors', () => {
      it('should throw an exception when HTTP response error is 400', fakeAsync(
        inject([CarShowService, HttpClient], (service: CarShowService, httpClient: HttpClient) => {
          // Given

          const error = new HttpErrorResponse({
            error: 'Failed download stream',
            status: 400,
            statusText: 'Bad request'
          });

          const httpClientSpy = spyOn(httpClient, 'get').and.returnValue(throwError(error));

          // When
          const service$ = service.fetchCarShows();
          service$.subscribe(_ => {
          }, (responseError: HttpErrorResponse) => expect(responseError.error).toEqual('Failed download stream'));

          // Then
          tick(1);
          expect(httpClientSpy.calls.count()).toBe(1);
          expect(httpClientSpy.calls.argsFor(0)).toEqual([apiUrl]);
          discardPeriodicTasks();
        })
      ));

      it('should return EMPTY result when HTTP response error is 404', fakeAsync(
        inject([CarShowService, HttpClient], (service: CarShowService, httpClient: HttpClient) => {
          // Given

          const error = new HttpErrorResponse({
            error: 'Not found',
            status: 404,
            statusText: 'Not found'
          });

          const httpClientSpy = spyOn(httpClient, 'get').and.returnValue(throwError(error));

          // When
          const service$ = service.fetchCarShows();
          service$.subscribe((response) => expect(response).toEqual(EMPTY));

          // Then
          tick(1);
          expect(httpClientSpy.calls.count()).toBe(1);
          expect(httpClientSpy.calls.argsFor(0)).toEqual([apiUrl]);
          discardPeriodicTasks();
        })
      ));
    });
  });
});
