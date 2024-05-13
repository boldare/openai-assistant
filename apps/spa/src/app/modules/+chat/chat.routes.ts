import { Routes } from '@angular/router';
import { ChatComponent } from './containers/chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./containers/chat-home/chat-home.component').then(
            mod => mod.ChatHomeComponent,
          ),
      },
      {
        path: 'chat',
        loadComponent: () =>
          import('./containers/chat-cloud/chat-cloud.component').then(
            mod => mod.ChatCloudComponent,
          ),
      },
      {
        path: 'integration',
        loadComponent: () =>
          import(
            './containers/chat-integration/chat-integration.component'
          ).then(mod => mod.ChatIntegrationComponent),
      },
    ],
  },
  {
    path: 'chat/iframe',
    loadComponent: () =>
      import('./containers/chat-iframe/chat-iframe.component').then(
        mod => mod.ChatIframeComponent,
      ),
  },
];
