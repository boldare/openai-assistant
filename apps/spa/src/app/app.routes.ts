import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/+chat/chat.routes').then(m => m.routes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
