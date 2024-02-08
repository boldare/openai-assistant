import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./containers/chat-example/chat-example.component').then(
        mod => mod.ChatExampleComponent,
      ),
  },
  {
    path: 'iframe',
    loadComponent: () =>
      import('./containers/chat/chat.component').then(mod => mod.ChatComponent),
  },
];
