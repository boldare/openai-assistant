import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIframeWrapperComponent } from './chat-iframe-wrapper.component';

describe('ChatIframeWrapperComponent', () => {
  let component: ChatIframeWrapperComponent;
  let fixture: ComponentFixture<ChatIframeWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatIframeWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatIframeWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
