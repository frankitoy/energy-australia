import { TestBed, inject } from '@angular/core/testing';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/lib/testing';

import { EMPTY, of, throwError } from 'rxjs';

import { CarShowService } from '../shared/services/car-show.service';

import { CarShowActions } from './car-show.actions';
import { CarShow } from '../shared/models/car-show';

import { carShowFixtures } from '../../test/fixtures/car-show-fixtures';

class MockCarShowService {
  fetchCarShows() {
    return of({});
  }
}

describe('CarShowActions', () => {
  let reduxDispatchSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxTestingModule
      ],
      providers: [
        {
          provide: CarShowService,
          useClass: MockCarShowService
        },
        CarShowActions
      ]
    });

    reduxDispatchSpy = spyOn(MockNgRedux.getInstance(), 'dispatch');
  });

  describe('fetchCarShows()', () => {

    it('should dispatch the fetch car shows start action', inject([CarShowActions],
      (actions: CarShowActions) => {
      // Given

      // When
      actions.fetchCarShows();

      // Then
      expect(reduxDispatchSpy).toHaveBeenCalledWith({ type: CarShowActions.GET_CAR_SHOW_START });
    }));

    it('should load the car shows via the car show service', inject([CarShowActions, CarShowService],
      (actions: CarShowActions, carShowService: CarShowService) => {
        // Given
        spyOn(carShowService, 'fetchCarShows').and.returnValue(of(carShowFixtures()));

        // When
        actions.fetchCarShows();

        // Then
        expect(carShowService.fetchCarShows).toHaveBeenCalled();
      })
    );

    it('should load the car shows when service call is successful', inject([CarShowActions, CarShowService],
      (actions: CarShowActions, carShowService: CarShowService) => {
        // Given
        spyOn(carShowService, 'fetchCarShows').and.returnValue(of(carShowFixtures()));

        // When
        actions.fetchCarShows();

        // Then
        expect(reduxDispatchSpy).toHaveBeenCalledWith({ type: CarShowActions.GET_CAR_SHOW_START });
        expect(reduxDispatchSpy).toHaveBeenCalledWith({ type: CarShowActions.GET_CAR_SHOW_RESOLVE, payload: carShowFixtures() });
        expect(reduxDispatchSpy).toHaveBeenCalledWith({ type: CarShowActions.GET_CAR_SHOW_END });
      })
    );

    it('should call start and end dispatch actions when carShowService.fetchCarShows return a HTTP 400 bad response',
      inject([CarShowActions, CarShowService],
        (actions: CarShowActions, carShowService: CarShowService) => {
          // Given
          spyOn(carShowService, 'fetchCarShows').and.returnValue(throwError(
            {
              status: 400,
              error: 'Failed Download stream'
            })
          );

          // When
          actions.fetchCarShows();

          // Then
          expect(reduxDispatchSpy).toHaveBeenCalledWith({ type: CarShowActions.GET_CAR_SHOW_START });
          expect(reduxDispatchSpy).toHaveBeenCalledWith({ type: CarShowActions.GET_CAR_SHOW_ERROR, payload: 'Failed Download stream' });
          expect(reduxDispatchSpy).toHaveBeenCalledWith({ type: CarShowActions.GET_CAR_SHOW_END });
        }
      )
    );
  });
});
