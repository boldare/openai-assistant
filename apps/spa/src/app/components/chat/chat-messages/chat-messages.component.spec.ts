import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatMessagesComponent } from './chat-messages.component';

describe('CardContentComponent', () => {
  let component: ChatMessagesComponent;
  let fixture: ComponentFixture<ChatMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatMessagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
