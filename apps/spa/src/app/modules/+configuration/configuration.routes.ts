import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/configuration/configuration.component').then(
        (m) => m.ConfigurationComponent
      ),
  },
];
