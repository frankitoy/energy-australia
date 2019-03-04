import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  MatCardModule,
  MatCommonModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatLineModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule
} from '@angular/material';

import { environment } from '../../../environments/environment';

import { CarShowActions } from '../../actions/car-show.actions';

import { apiConstants } from '../../shared/constants/api.constant';
import { CarShowService } from '../../shared/services/car-show.service';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    HomePageRoutingModule,
    RouterModule,
    MatCardModule,
    MatCommonModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatLineModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule
  ],
  providers: [
    {
      provide: apiConstants.config.carShowUrl,
      useValue: environment.api
    },
    CarShowActions,
    CarShowService
  ],
  declarations: [
    HomePageComponent
  ],
  exports: [
    HomePageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
