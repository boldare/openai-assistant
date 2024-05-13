import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCloudComponent } from './chat-cloud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkdownModule } from 'ngx-markdown';

describe('ChatHomeComponent', () => {
  let component: ChatCloudComponent;
  let fixture: ComponentFixture<ChatCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatCloudComponent,
        HttpClientTestingModule,
        MarkdownModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
