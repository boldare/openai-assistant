import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatStatusComponent } from './chat-status.component';

describe('ChatStatusComponent', () => {
  let component: ChatStatusComponent;
  let fixture: ComponentFixture<ChatStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
