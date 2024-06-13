import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MarkdownModule } from 'ngx-markdown';

import { ChatCloudComponent } from './chat-cloud.component';
import { AnnotationPipe } from '../../../../pipes/annotation.pipe';

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
      providers: [AnnotationPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
