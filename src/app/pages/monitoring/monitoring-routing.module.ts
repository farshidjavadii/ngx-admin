import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonitoringComponent } from './monitoring.component';
import { ServicesMonitoringComponent } from './service-monitoring/services-monitoring/services-monitoring.component';



const routes: Routes = [
  {
    path: '',
    component: MonitoringComponent,
    children: [
      {
        path: 'services-monitoring',
        component: ServicesMonitoringComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class MonitoringRoutingModule {
}

