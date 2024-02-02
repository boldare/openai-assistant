import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIframeComponent } from './chat-iframe.component';

describe('ChatIframeComponent', () => {
  let component: ChatIframeComponent;
  let fixture: ComponentFixture<ChatIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatIframeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
