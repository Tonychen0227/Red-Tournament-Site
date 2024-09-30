import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickemsLeaderboardComponent } from './pickems-leaderboard.component';

describe('PickemsLeaderboardComponent', () => {
  let component: PickemsLeaderboardComponent;
  let fixture: ComponentFixture<PickemsLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickemsLeaderboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickemsLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
