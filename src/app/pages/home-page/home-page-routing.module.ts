import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageTitle } from '../../shared/constants/page-title.constant';

import { HomePageComponent } from './home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, data: { title: PageTitle.home }}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class HomePageRoutingModule { }
