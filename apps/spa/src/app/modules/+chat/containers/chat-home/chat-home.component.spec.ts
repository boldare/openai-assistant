import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatHomeComponent } from './chat-home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkdownModule } from 'ngx-markdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnnotationPipe } from '../../../../pipes/annotation.pipe';

describe('ChatHomeComponent', () => {
  let component: ChatHomeComponent;
  let fixture: ComponentFixture<ChatHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChatHomeComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MarkdownModule.forRoot(),
      ],
      providers: [AnnotationPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
