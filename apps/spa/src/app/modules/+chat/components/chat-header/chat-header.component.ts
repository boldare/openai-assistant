import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ai-chat-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chat-header.component.html',
  styleUrl: './chat-header.component.scss',
})
export class ChatHeaderComponent {}
