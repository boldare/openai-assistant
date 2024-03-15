import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIntegrationComponent } from './chat-integration.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkdownModule } from 'ngx-markdown';

describe('ChatIntegrationComponent', () => {
  let component: ChatIntegrationComponent;
  let fixture: ComponentFixture<ChatIntegrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatIntegrationComponent,
        HttpClientTestingModule,
        MarkdownModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
