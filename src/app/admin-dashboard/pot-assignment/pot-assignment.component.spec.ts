import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotAssignmentComponent } from './pot-assignment.component';

describe('PotAssignmentComponent', () => {
  let component: PotAssignmentComponent;
  let fixture: ComponentFixture<PotAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PotAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
