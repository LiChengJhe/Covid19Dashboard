import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';


const routes: Routes = [
  {
    path: 'covid-19',

    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent
      }
    ]
  },
  { path: '', redirectTo: 'covid-19/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'covid-19/dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Covid19RoutingModule { }
