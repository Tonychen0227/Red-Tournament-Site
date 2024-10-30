import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickemsStatsComponent } from './pickems-stats.component';

describe('PickemsStatsComponent', () => {
  let component: PickemsStatsComponent;
  let fixture: ComponentFixture<PickemsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickemsStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickemsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
