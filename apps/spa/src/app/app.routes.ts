import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/chat',
      },
      {
        path: 'chat',
        loadChildren: () =>
          import('./modules/+chat/chat.routes').then((mod) => mod.routes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
