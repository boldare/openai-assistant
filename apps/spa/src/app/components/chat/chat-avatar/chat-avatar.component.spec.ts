import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAvatarComponent } from './chat-avatar.component';

describe('ChatAvatarComponent', () => {
  let component: ChatAvatarComponent;
  let fixture: ComponentFixture<ChatAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
