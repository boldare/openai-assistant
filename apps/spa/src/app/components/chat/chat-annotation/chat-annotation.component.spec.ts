import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatAnnotationComponent } from './chat-annotation.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChatAnnotationComponent', () => {
  let component: ChatAnnotationComponent;
  let fixture: ComponentFixture<ChatAnnotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatAnnotationComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
