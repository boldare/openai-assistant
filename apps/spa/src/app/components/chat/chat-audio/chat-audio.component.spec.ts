import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatAudioComponent } from './chat-audio.component';

describe('ChatComponent', () => {
  let component: ChatAudioComponent;
  let fixture: ComponentFixture<ChatAudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAudioComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
