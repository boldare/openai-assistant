import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRecorderComponent } from './chat-recorder.component';

describe('MessageTyping', () => {
  let component: ChatRecorderComponent;
  let fixture: ComponentFixture<ChatRecorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatRecorderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
