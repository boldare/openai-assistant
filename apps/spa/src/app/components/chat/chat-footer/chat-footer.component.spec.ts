import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatFooterComponent } from './chat-footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ChatFooterComponent', () => {
  let component: ChatFooterComponent;
  let fixture: ComponentFixture<ChatFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatFooterComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
