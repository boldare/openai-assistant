import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/config',
      },
      {
        path: 'config',
        loadChildren: () =>
          import('./modules/+configuration/configuration.routes').then((m) => m.routes),
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./modules/+chat/chat.routes').then((m) => m.routes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
