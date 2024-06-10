import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContentComponent } from './message-content.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MessageContentComponent', () => {
  let component: MessageContentComponent;
  let fixture: ComponentFixture<MessageContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageContentComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MessageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
