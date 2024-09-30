import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickemsAdminDashboardComponent } from './pickems-admin-dashboard.component';

describe('PickemsAdminDashboardComponent', () => {
  let component: PickemsAdminDashboardComponent;
  let fixture: ComponentFixture<PickemsAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickemsAdminDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickemsAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
