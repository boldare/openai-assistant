import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatIframeComponent } from './chat-iframe.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AnnotationPipe } from '../../../../pipes/annotation.pipe';

describe('ChatIframeComponent', () => {
  let component: ChatIframeComponent;
  let fixture: ComponentFixture<ChatIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ChatIframeComponent,
        RouterTestingModule,
      ],
      providers: [AnnotationPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
