import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlIconComponent } from './control-icon.component';

describe('CardComponent', () => {
  let component: ControlIconComponent;
  let fixture: ComponentFixture<ControlIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
