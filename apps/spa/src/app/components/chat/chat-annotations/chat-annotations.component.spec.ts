import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarkdownModule } from 'ngx-markdown';
import { ChatAnnotationsComponent } from './chat-annotations.component';

describe('ChatAnnotationsComponent', () => {
  let component: ChatAnnotationsComponent;
  let fixture: ComponentFixture<ChatAnnotationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAnnotationsComponent, MarkdownModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatAnnotationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
