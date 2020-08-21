import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  MatCardModule,
  MatCommonModule,
  MatDividerModule,
  MatLineModule,
  MatListModule,
  MatSnackBarModule
} from '@angular/material';

import { environment } from '../../../environments/environment';

import { CarShowActions } from '../../actions/car-show.actions';

import { apiConstants } from '../../shared/constants/api.constant';
import { CarShowService } from '../../shared/services/car-show.service';
import { SortPipe } from '../../shared/pipes/sort.pipe';

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
    MatDividerModule,
    MatLineModule,
    MatListModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: apiConstants.config.carShowUrl,
      useValue: environment.api
    },
    CarShowActions,
    CarShowService,
    SortPipe
  ],
  declarations: [
    SortPipe,
    HomePageComponent
  ],
  exports: [
    SortPipe,
    HomePageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
