import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlItemComponent } from './control-item.component';

describe('CardComponent', () => {
  let component: ControlItemComponent;
  let fixture: ComponentFixture<ControlItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
