import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickemsTournamentComponent } from './pickems-tournament.component';

describe('PickemsTournamentComponent', () => {
  let component: PickemsTournamentComponent;
  let fixture: ComponentFixture<PickemsTournamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickemsTournamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickemsTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
