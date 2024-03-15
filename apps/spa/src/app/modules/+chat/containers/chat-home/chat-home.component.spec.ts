import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHomeComponent } from './chat-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkdownModule } from 'ngx-markdown';

describe('ChatHomeComponent', () => {
  let component: ChatHomeComponent;
  let fixture: ComponentFixture<ChatHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatHomeComponent,
        HttpClientTestingModule,
        MarkdownModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
