import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatExampleComponent } from './chat-example.component';

describe('ChatComponent', () => {
  let component: ChatExampleComponent;
  let fixture: ComponentFixture<ChatExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatExampleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
