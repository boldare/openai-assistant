import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatExampleComponent } from './chat-example.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkdownModule } from 'ngx-markdown';

describe('ChatExampleComponent', () => {
  let component: ChatExampleComponent;
  let fixture: ComponentFixture<ChatExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatExampleComponent,
        HttpClientTestingModule,
        MarkdownModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
