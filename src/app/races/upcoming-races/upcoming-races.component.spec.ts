import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingRacesComponent } from './upcoming-races.component';

describe('UpcomingRacesComponent', () => {
  let component: UpcomingRacesComponent;
  let fixture: ComponentFixture<UpcomingRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingRacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
