import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTipComponent } from './chat-tip.component';

describe('ChatTipComponent', () => {
  let component: ChatTipComponent;
  let fixture: ComponentFixture<ChatTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatTipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
