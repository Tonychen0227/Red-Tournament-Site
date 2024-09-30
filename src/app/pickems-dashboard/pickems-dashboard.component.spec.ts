import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickemsDashboardComponent } from './pickems-dashboard.component';

describe('PickemsDashboardComponent', () => {
  let component: PickemsDashboardComponent;
  let fixture: ComponentFixture<PickemsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickemsDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickemsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
