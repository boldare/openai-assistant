import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTipsComponent } from './chat-tips.component';

describe('ChatTipComponent', () => {
  let component: ChatTipsComponent;
  let fixture: ComponentFixture<ChatTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatTipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
