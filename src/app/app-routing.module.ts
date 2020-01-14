import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

import { PageTitle } from './shared/constants/page-title.constant';

const routes: Routes = [
  {
    path: '',
    loadChildren: './pages/home-page/home-page.module#HomePageModule',
    data: { title: PageTitle.home }
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
