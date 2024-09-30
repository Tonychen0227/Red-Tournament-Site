import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRaceResultsComponent } from './edit-race-results.component';

describe('EditRaceResultsComponent', () => {
  let component: EditRaceResultsComponent;
  let fixture: ComponentFixture<EditRaceResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRaceResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRaceResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
