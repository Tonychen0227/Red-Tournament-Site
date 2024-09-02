import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitRaceComponent } from './submit-race.component';

describe('SubmitRaceComponent', () => {
  let component: SubmitRaceComponent;
  let fixture: ComponentFixture<SubmitRaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitRaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitRaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
