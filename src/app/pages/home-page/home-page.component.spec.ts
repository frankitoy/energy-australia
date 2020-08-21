import { Injectable } from '@angular/core';
import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { Subject } from 'rxjs';

import { NgReduxModule } from '@angular-redux/store';
import { MockNgRedux, NgReduxTestingModule } from '@angular-redux/store/testing';

import { MatSnackBar, MatSnackBarModule } from '@angular/material';

import { carShowFixtures } from '../../../test/fixtures/car-show-fixtures';

import * as servicesStubs from '../../../test/helpers/services-stub';

import { CarShowActions } from '../../actions/car-show.actions';

import { CarShow } from '../../shared/models/car-show';
import { Messages } from '../../shared/constants/messages.constant';

import { IAppState } from '../../store/store';

import { HomePageComponent } from './home-page.component';
import { HomePageModule } from './home-page.module';


@Injectable()
class MockCarShowActions {
  fetchCarShows() {
  }
}

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  let carShowActions: CarShowActions;

  let carShowsStub: Subject<Array<CarShow>>;
  let notificationStub: Subject<string>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgReduxModule,
        NgReduxTestingModule,
        MatSnackBarModule,
        HomePageModule
      ],
      providers: [
        {
          provide: MatSnackBar,
          useClass: servicesStubs.MockMatSnackBar
        },
        {
          provide: CarShowActions,
          useClass: MockCarShowActions
        }
      ]
    }).compileComponents();

    MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;

    carShowActions = fixture.debugElement.injector.get(CarShowActions);
    carShowsStub = MockNgRedux.getSelectorStub<IAppState, Array<CarShow>>('carShows');
    notificationStub = MockNgRedux.getSelectorStub<IAppState, string>('notification');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('unit tests', () => {
    describe('_carShowSubscribe()', () => {

      it('should populate component with car shows when api response is valid car shows fixture', () => {
        // Given
        carShowsStub.next(carShowFixtures());
        fixture.detectChanges();

        // When
        component.ngOnInit();

        // Then
        expect(component.carShowsToDisplay).toBeTruthy();
      });

      it('should call the snackbar warning message when api response is empty',
        inject([MatSnackBar], (snackBar: MatSnackBar) => {
        // Given
        spyOn(snackBar, 'open');
        carShowsStub.next('' as any);
        fixture.detectChanges();

        // When
        component.ngOnInit();

        // Then
        expect(snackBar.open).toHaveBeenCalledWith(Messages.warning.emptyResult, 'close', {
          duration: 2000,
          verticalPosition: 'top',
          horizontalPosition: 'end',
          panelClass: ['error']
        });
      }));
    });

    describe('_notificationSubscribe()', () => {

      it('should populate component services when supplied with failed error message',
        inject([MatSnackBar], (snackBar: MatSnackBar) => {
        // Given
        notificationStub.next('Failed download stream');
        spyOn(snackBar, 'open');

        // When
        fixture.detectChanges();
        component.ngOnInit();

        // Then
          expect(snackBar.open).toHaveBeenCalledWith('Failed download stream', 'close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            panelClass: ['error']
          });
      }));
    });

  });
});
