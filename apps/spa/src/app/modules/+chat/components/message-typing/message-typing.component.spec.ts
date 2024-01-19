import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageTypingComponent } from './message-typing.component';

describe('MessageTyping', () => {
  let component: MessageTypingComponent;
  let fixture: ComponentFixture<MessageTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageTypingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
