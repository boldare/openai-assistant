import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorderComponent } from './recorder.component';

describe('ChatRecorderComponent', () => {
  let component: RecorderComponent;
  let fixture: ComponentFixture<RecorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecorderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
